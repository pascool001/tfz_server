const HyperExpress = require('hyper-express');
const wallet_api_router = new HyperExpress.Router()
const routePath = '/wallet'
const {WalletCtrl: {getAll, getOne, post, put, remove }} = require("../controller")

const {authenticate} = require('../middlewares')

wallet_api_router.use(`${routePath}`, authenticate) 

wallet_api_router.post(`${routePath}`, post);

wallet_api_router.route(`${routePath}`).get(getAll)

wallet_api_router.route(`${routePath}/:id`).get(getOne)

wallet_api_router.route(`${routePath}/:id`).put(put)

wallet_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = wallet_api_router