const HyperExpress = require('hyper-express');
const user_api_router = new HyperExpress.Router()

const routePath = '/user'
const {UserCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

user_api_router.use(`${routePath}`, authenticate) 

user_api_router.post(`${routePath}`, post);

user_api_router.route(`${routePath}`).get(getAll)

user_api_router.route(`${routePath}/:id`).get(getOne)

user_api_router.route(`${routePath}/:id`).put(put)

user_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = user_api_router