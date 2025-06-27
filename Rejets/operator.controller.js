
const Operator = require('../database/mongodb/repository/Operator')
const {getImage, delImage} = require('../services/fileService')


const postOperator = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await Operator.create({...body})
    const image = await getImage(created, 'oper_logo_filename');
    return response.send(JSON.stringify({...created.toJSON(), oper_logo: image}));
}

const getAllOperator = async (request, response) => {
    response.type('json')
    let List = await Operator.getAll()
    //associer à chaque objet son image
    for (let index = 0; index < List.length; index++) {
        const image = await getImage(List[index], 'oper_logo_filename')
        List[index] = {...List[index].toJSON(), oper_logo: image}
    }
    return response.json(List)
}

const getOneOperator = async (request, response) => {
    let id = request.path_parameters.id;
    const resultData = await Operator.findOne({_id: id})
    // delete resultData.country.country_operators;
    const image = await getImage(resultData, 'oper_logo_filename');
    return response.json({...resultData.toJSON(), oper_logo: image})
}

const putOperator = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    await delImage(body, 'lastFlag')
    const UpdatedData = await Operator.update(body, id)
    const image = await getImage(UpdatedData, 'oper_logo_filename');
    return response.send(JSON.stringify({...UpdatedData.toJSON(), oper_logo: image}));
}


const deleteOperator = async (request, response) => {
    const id = request.path_parameters.id;
    const result = await Operator.remove(id)
    await delImage(result, 'oper_logo_filename')
    return response.json(result.toJSON())
}

module.exports = {
    deleteOperator,
    putOperator,
    getOneOperator,
    getAllOperator,
    postOperator
}