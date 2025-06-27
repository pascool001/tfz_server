const {UserModel} = require('../model')
// const document_Refs = require('../mongodb/document_Refs');
// const {updateCountry, getCountryById} = require('./Country')


const create = async (data) => {
    try {
        const instance = new UserModel(data);
        const result = await instance.save()
        return result
    } catch (error) {
        console.log('Error create UserModel  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await UserModel.findByIdAndUpdate(id, {...data});
        const result = await UserModel.findById(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await UserModel.findOne(query);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await UserModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const remove = async (id) => {
    try {
        const result = await UserModel.findByIdAndDelete(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

// document_Refs.on('setAccRefToUser', async (ref, userId) => {
//     let doc = await User.findOne({_id: userId});
//     doc.accounts = [...doc.accounts, ref];
//     await doc.save();
// })


// document_Refs.on('delAccRefFromUser', async (ref, userId) => {
//     let doc = await User.findById(userId);
//     const {accounts} = doc;
//     if (accounts.length > 0) {
//         const index = accounts.indexOf(ref);
//         if (index !== -1) {
//             accounts.splice(index, 1)
//             doc.accounts = accounts;
//             await doc.save();
//         }
//     }
// } )



module.exports = {
    create,
    update,
    findOne,
    getAll,
    remove
}