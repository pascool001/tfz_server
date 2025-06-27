const { WalletRepo } = require('../database/repository')

const { getImage, delImage} = require('../services/file/fileService')



const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await WalletRepo.create({...body});
    const image = await getImage(created, 'wallet_logo_filename');
    // return response.send(JSON.stringify({...created.toJSON(), oper_logo: image}));
    return response.json({...created.toJSON(), wallet_logo: image});
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await WalletRepo.getAll()
     //associer à chaque objet son image
    for (let index = 0; index < List.length; index++) {
        const image = await getImage(List[index], 'wallet_logo_filename')
        List[index] = {...List[index].toJSON(), wallet_logo: image}
    }
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const Data = await WalletRepo.findOne({_id: id});
    const image = await getImage(Data, 'wallet_logo_filename');
    return response.json({...Data.toJSON(), wallet_logo: image})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const OldWallet = await WalletRepo.findOne({_id: id}); // obtenir l'ancien image filename
    // suppression de l'ancien logo file, s'il y a eu modification
    if (OldWallet.wallet_logo_filename !== body.wallet_logo_filename) await delImage(OldWallet, 'wallet_logo_filename')
    const UpdatedData = await WalletRepo.update(body, id) 
    const image = await getImage(UpdatedData, 'wallet_logo_filename');
    return response.send(JSON.stringify({...UpdatedData.toJSON(), wallet_logo: image}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await WalletRepo.remove(id)
    await delImage(result, 'wallet_logo_filename')
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

