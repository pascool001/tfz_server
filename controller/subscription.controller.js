const {SubscriptionRepo } = require('../database/repository')

// const { getImage, delImage} = require('../services/fileService')



const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await SubscriptionRepo.create({...body});
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await SubscriptionRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const SubscriptionData = await SubscriptionRepo.findOne({_id: id});
    return response.json( {...SubscriptionData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();

    const UpdatedData = await SubscriptionRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await SubscriptionRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

