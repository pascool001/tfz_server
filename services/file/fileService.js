
const mongoose = require('mongoose');

const grid = require('gridfs-stream');


let gfs, gridfsBucket;

(() => {
  mongoose.connection.on("connected", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();

// const {gfs, gridfsBucket } = require('./gridfs')


const getFileToBase64 = async (filename, res) => {

    const file = await gfs.files.findOne({ filename });

    const readStream = gridfsBucket.openDownloadStream(file._id);
    const bufs = []
    readStream.on('data', (chunk) => {
        bufs.push(chunk)
    })
    let base64;
    readStream.on('end', () => {
        const fbuf = Buffer.concat(bufs);
        base64 = fbuf.toString('base64');
        return res.json({filename, data: base64})
    });

}

const joinBase64Img = (filename) => {
    return new Promise(async (resolve) => {
        gfs.files.findOne({ filename }).then(async file => {
            let bufs = []; let base64;
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.on('data', (chunk) => { bufs.push(chunk) }).on('end', () => {
                const fbuf = Buffer.concat(bufs);
                base64 = fbuf.toString('base64');
                resolve({isOk: true, image: base64, message: ""})
            });
        }).catch(async err => {
            resolve({isOk: false, image: "", message: 'image introuvable:' + err.message})
        })
        
    }) 
}

const removeLinkedImage = async (filename) => {
    return new Promise(async (resolve) => {
        gfs.files.findOne({ filename }).then(async file => {
            gridfsBucket.delete(file._id).then( () => {
                resolve({deleted: true, message: 'Image associée supprimer avec success!!'})
            } ).catch(err => {
                resolve({deleted: false, message: 'Echec suppression de l\'image asspciée :' + err.message})
            })
        }).catch(err => {
            resolve({deleted: false, message: 'Echec suppression de l\'image asspciée :' + err.message})
        })
    } )

}


const download_callback = async (request, response) => {
    let filename = request.path_parameters.filename
    try {
         await getFileToBase64(filename, response)
    } catch (error) {
        response.json({message: error.message});
    }
}

const fileRemove = async (request, response) => {
    let filename = request.path_parameters.filename
    try {
        const file = await gfs.files.findOne({ filename });

        await gridfsBucket.delete(file._id);
        response.json({removed: filename})
    } catch (error) {
        response.json({message: error.message});
    }
}

const hasImageFile = (filename) => {
    return (filename && (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg'))) ? true : false;
}

const getImage = async (doc, imageField) => {
    let b64="";
    if (doc && imageField) {
        const { [imageField]: filename } = doc
        if (hasImageFile(filename)) {
            const {isOk, image} = await joinBase64Img(filename)
            b64 = (isOk) ? image: "";
        }
    } 
    return b64;
}

const delImage = async (doc, imageField) => {
    if (doc && imageField) {
        const {[imageField]: filename } = doc
        if (hasImageFile(filename)) {
            await removeLinkedImage(filename);
        }
    }
}




module.exports = {
    fileRemove,
    download_callback,
    joinBase64Img,
    removeLinkedImage,
    hasImageFile,
    getImage,
    delImage
}


