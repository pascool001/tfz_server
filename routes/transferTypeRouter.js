const HyperExpress = require('hyper-express');
const transferType_api_router = new HyperExpress.Router()

const routePath = '/transfer_type'
const {TransferTypeCtrl: { getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

transferType_api_router.use(`${routePath}`, authenticate) 

transferType_api_router.post(`${routePath}`, post);

transferType_api_router.route(`${routePath}`).get(getAll)

transferType_api_router.route(`${routePath}/:id`).get(getOne)

transferType_api_router.route(`${routePath}/:id`).put(put)

transferType_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = transferType_api_router