const { WalletModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new WalletModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create Profil  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await WalletModel.findByIdAndUpdate(id, {...data});
        const result = await WalletModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await WalletModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await WalletModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await WalletModel.findOneAndDelete({_id: id});
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
