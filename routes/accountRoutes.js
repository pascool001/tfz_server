const HyperExpress = require('hyper-express');
const account_api_router = new HyperExpress.Router()

const routePath = '/account'
const {AccountCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

const {authenticate} = require('../middlewares')

account_api_router.use(`${routePath}`, authenticate) 

account_api_router.post(`${routePath}`, post);


account_api_router.get(`${routePath}`, getAll)

account_api_router.get(`${routePath}/:id`, getOne)

account_api_router.put(`${routePath}/:id`, put)

account_api_router.delete(`${routePath}/:id`, remove)


module.exports = account_api_router