const HyperExpress = require('hyper-express');
const spm_api_router = new HyperExpress.Router()

const routePath = '/spm'
const {SpmCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


const {authenticate} = require('../middlewares')

spm_api_router.use(`${routePath}`, authenticate) 

spm_api_router.post(`${routePath}`, post);

spm_api_router.route(`${routePath}`).get(getAll)

spm_api_router.route(`${routePath}/:id`).get(getOne)

spm_api_router.route(`${routePath}/:id`).put(put)

spm_api_router.route(`${routePath}/:id`).delete(remove)


module.exports = spm_api_router