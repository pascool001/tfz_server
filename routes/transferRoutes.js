const HyperExpress = require('hyper-express');
const transfer_api_router = new HyperExpress.Router()

const routePath = '/transfer'
const {TransferCtrl: { getAll, getOne, post, put, remove }} = require("../controller")


const {authenticate} = require('../middlewares')

transfer_api_router.use(`${routePath}`, authenticate) 

transfer_api_router.post(`${routePath}`, post);

transfer_api_router.route(`${routePath}`).get(getAll)

transfer_api_router.route(`${routePath}/:id`).get(getOne)

transfer_api_router.route(`${routePath}/:id`).put(put)

transfer_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = transfer_api_router