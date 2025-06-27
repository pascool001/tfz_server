const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto');
const path = require('path');


const upload = () => {
  const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              req.filename = filename;
              const fileInfo = {
                originalname: file.originalname,
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo);
            });
          });
        }
    });
    return multer({ storage });
}


module.exports = upload;
