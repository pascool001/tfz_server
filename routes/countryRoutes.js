const HyperExpress = require('hyper-express');
const country_api_router = new HyperExpress.Router()
const routePath = '/country'
const {CountryCtrl: {getAll, getOne, post, put, remove }} = require("../controller")

const {authenticate} = require('../middlewares')

country_api_router.use(`${routePath}`, authenticate) 

country_api_router.post(`${routePath}`, post);

country_api_router.route(`${routePath}`).get(getAll)

country_api_router.route(`${routePath}/:id`).get(getOne)

country_api_router.route(`${routePath}/:id`).put(put)

country_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = country_api_router