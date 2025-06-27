const {SubscriptionModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new SubscriptionModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create Subscription  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await SubscriptionModel.findByIdAndUpdate(id, {...data});
        const result = await SubscriptionModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await SubscriptionModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await SubscriptionModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await SubscriptionModel.findOneAndDelete({_id: id});
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
