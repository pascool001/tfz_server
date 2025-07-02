const { TransPricingModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new TransPricingModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create TransPricingModel  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await TransPricingModel.findByIdAndUpdate(id, {...data});
        const result = await TransPricingModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await TransPricingModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await TransPricingModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await TransPricingModel.findOneAndDelete({_id: id});
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
