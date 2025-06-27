const {TransferModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new TransferModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create Transfer  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await TransferModel.findByIdAndUpdate(id, {...data});
        const result = await TransferModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await TransferModel.findOne(query) //.populate('country');
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await TransferModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await TransferModel.findOneAndDelete({_id: id});
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
