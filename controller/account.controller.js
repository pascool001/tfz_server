
const {AccountRepo} = require('../database/repository')


const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await AccountRepo.create({...body})
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await AccountRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const resultData = await AccountRepo.findOne({_id: id})
    return response.json({...resultData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await AccountRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}


const remove = async (request, response) => {
    const id = request.path_parameters.id;
    const result = await AccountRepo.remove(id)
    return response.json(result.toJSON())
}

module.exports = {
    remove,
    put,
    getOne,
    getAll,
    post
}