const {ServiceRepo } = require('../database/repository')

const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await ServiceRepo.create({...body});
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await ServiceRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const ServiceData = await ServiceRepo.findOne({_id: id});
    return response.json( {...ServiceData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();

    const UpdatedData = await ServiceRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await ServiceRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

