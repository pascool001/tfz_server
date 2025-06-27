const HyperExpress = require('hyper-express');
const service_api_router = new HyperExpress.Router()

const routePath = '/service'
const {ServiceCtrl: {getAll, getOne, post, put, remove} } = require("../controller")


const {authenticate} = require('../middlewares')

service_api_router.use(`${routePath}`, authenticate)
 
service_api_router.post(`${routePath}`, post);

service_api_router.route(`${routePath}`).get(getAll)

service_api_router.route(`${routePath}/:id`).get(getOne)

service_api_router.route(`${routePath}/:id`).put(put)

service_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = service_api_router