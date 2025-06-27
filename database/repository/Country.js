const {CountryModel} = require('../model')
// const docrefs = require('../document_Refs')


const create = async (data) => {
    try {
        const instance = new CountryModel(data);
        const result = await instance.save()
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await CountryModel.findByIdAndUpdate(id, {...data});
        const result = await CountryModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error update country  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await CountryModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await CountryModel.find({})
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const remove = async (id) => {
    try {
        const result = await CountryModel.findByIdAndDelete(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

// docrefs.on('setOpeRefToCountryModel', async (ref, countryId) => {
//     let doc = await Country.findOne({_id: countryId});
//     doc.country_operators = [...doc.country_operators, ref];
//     await doc.save();
// })

// docrefs.on('delOpeRefFromCountry', async (ref, countryId) => {
//     let doc = await CountryModel.findById(countryId);
//     const {country_operators} = doc;
//     if (country_operators.length > 0) {
//         const index = country_operators.indexOf(ref);
//         if (index !== -1) {
//             country_operators.splice(index, 1)
//             doc.country_operators = country_operators;
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