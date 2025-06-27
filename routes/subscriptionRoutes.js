const HyperExpress = require('hyper-express');
const subscription_api_router = new HyperExpress.Router()

const routePath = '/subscription'
const {SubscriptionCtrl: { getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

subscription_api_router.use(`${routePath}`, authenticate) 

subscription_api_router.post(`${routePath}`, post);

subscription_api_router.route(`${routePath}`).get(getAll)

subscription_api_router.route(`${routePath}/:id`).get(getOne)

subscription_api_router.route(`${routePath}/:id`).put(put)

subscription_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = subscription_api_router