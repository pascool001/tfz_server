const {TransferTypeModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new TransferTypeModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create TransferType  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await TransferTypeModel.findByIdAndUpdate(id, {...data});
        const result = await TransferTypeModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await TransferTypeModel.findOne(query) //.populate('country');
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await TransferTypeModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await TransferTypeModel.findOneAndDelete({_id: id});
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
