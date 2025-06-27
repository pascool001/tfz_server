const HyperExpress = require('hyper-express');
const params_api_router = new HyperExpress.Router()

const routePath = '/params'
const {ParamCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

params_api_router.use(`${routePath}`, authenticate) 

params_api_router.post(`${routePath}`, post);

params_api_router.route(`${routePath}`).get(getAll)

params_api_router.route(`${routePath}/:id`).get(getOne)

params_api_router.route(`${routePath}/:id`).put(put)

params_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = params_api_router