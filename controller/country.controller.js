const {CountryRepo } = require('../database/repository')

// const { getImage, delImage} = require('../services/fileService')



const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await CountryRepo.create({...body});
    return response.json({...created.toJSON()});
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await CountryRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const countryData = await CountryRepo.findOne({_id: id});
    return response.json( {...countryData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await CountryRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await CountryRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

