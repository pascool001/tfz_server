const HyperExpress = require('hyper-express');

const transfer_pricing_router = new HyperExpress.Router()

const routePath = '/transfer-pricing'

const {TransferPricingCtrl: {getAll, getOne, post, put, remove }} = require("../controller")

const {authenticate} = require('../middlewares')

transfer_pricing_router.use(`${routePath}`, authenticate) 

transfer_pricing_router.post(`${routePath}`, post);

transfer_pricing_router.route(`${routePath}`).get(getAll)

transfer_pricing_router.route(`${routePath}/:id`).get(getOne)

transfer_pricing_router.route(`${routePath}/:id`).put(put)

transfer_pricing_router.route(`${routePath}/:id`).delete(remove)

module.exports = transfer_pricing_router