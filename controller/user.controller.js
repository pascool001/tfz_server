const { UserRepo } = require('../database/repository')

// const { getImage, delImage} = require('../services/fileService')



const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await UserRepo.create({...body});
    return response.send(JSON.stringify({...created.toJSON(), image}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await UserRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const UserData = await UserRepo.findOne({_id: id});
    return response.json({...UserData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await UserRepo.update(body, id)
    return response.json({...UpdatedData.toJSON()});
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await UserRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

