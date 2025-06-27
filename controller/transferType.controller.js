const {TransferTypeRepo } = require('../database/repository')

// const { getImage, delImage} = require('../Transfers/fileTransfer')

const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await TransferTypeRepo.create({...body});
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await TransferTypeRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const Data = await TransferTypeRepo.findOne({_id: id});
    return response.json( {...Data.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await TransferTypeRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await TransferTypeRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

