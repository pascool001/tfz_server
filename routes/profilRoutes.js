const HyperExpress = require('hyper-express');
const profil_api_router = new HyperExpress.Router()

const routePath = '/profil'
const {ProfilCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

profil_api_router.use(`${routePath}`, authenticate) 

profil_api_router.post(`${routePath}`, post);

profil_api_router.route(`${routePath}`).get(getAll)

profil_api_router.route(`${routePath}/:id`).get(getOne)

profil_api_router.route(`${routePath}/:id`).put(put)

profil_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = profil_api_router