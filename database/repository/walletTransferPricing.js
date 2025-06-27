const { WalletTransferPricingModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new WalletTransferPricingModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create WalletTransferPricing  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await WalletTransferPricingModel.findByIdAndUpdate(id, {...data});
        const result = await WalletTransferPricingModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await WalletTransferPricingModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await WalletTransferPricingModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await WalletTransferPricingModel.findOneAndDelete({_id: id});
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
