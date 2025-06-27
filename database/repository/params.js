const {ParamsModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new ParamsModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create ParamsModel  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await ParamsModel.findByIdAndUpdate(id, {...data});
        const result = await ParamsModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await ParamsModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await ParamsModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await ParamsModel.findOneAndDelete({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}


module.exports = {
    create,
    update,
    findOne,
    getAll,
    remove
}
