const {ServiceModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new ServiceModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create Service  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await ServiceModel.findByIdAndUpdate(id, {...data});
        const result = await ServiceModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await ServiceModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await ServiceModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await ServiceModel.findOneAndDelete({_id: id});
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
