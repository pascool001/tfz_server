const {AccountModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new AccountModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create Account  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await AccountModel.findByIdAndUpdate(id, {...data});
        const result = await AccountModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await AccountModel.findOne(query) //.populate('country');
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await AccountModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await AccountModel.findOneAndDelete({_id: id});
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
