const { WalletTransferPricingRepo } = require('../database/repository')




const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await WalletTransferPricingRepo.create({...body});
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await WalletTransferPricingRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const ServiceData = await WalletTransferPricingRepo.findOne({_id: id});
    return response.json( {...ServiceData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();

    const UpdatedData = await WalletTransferPricingRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await WalletTransferPricingRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

