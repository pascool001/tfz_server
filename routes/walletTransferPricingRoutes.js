const HyperExpress = require('hyper-express');
const wallet_transfer_pricing_api_router = new HyperExpress.Router()
const routePath = '/wallet-transfer-pricing'
const {WalletTransferPricingCtrl: {getAll, getOne, post, put, remove }} = require("../controller")

const {authenticate} = require('../middlewares')

wallet_transfer_pricing_api_router.use(`${routePath}`, authenticate) 

wallet_transfer_pricing_api_router.post(`${routePath}`, post);

wallet_transfer_pricing_api_router.route(`${routePath}`).get(getAll)

wallet_transfer_pricing_api_router.route(`${routePath}/:id`).get(getOne)

wallet_transfer_pricing_api_router.route(`${routePath}/:id`).put(put)

wallet_transfer_pricing_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = wallet_transfer_pricing_api_router