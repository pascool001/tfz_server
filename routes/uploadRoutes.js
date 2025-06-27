const HyperExpress = require('hyper-express');



const media_api_router = new HyperExpress.Router()

const MEDIA_API_PREFIX = process.env.MEDIA_API_PREFIX

const {upload} = require('../middlewares')

const { afterUpload, fileRemove, download_callback } = require('../services/file/fileService');


media_api_router.use(`${MEDIA_API_PREFIX}/upload`, upload().single("file"))

media_api_router.route(`${MEDIA_API_PREFIX}/upload`).post((request, response) => {
    try {
        return response.json({filename: request.file.filename})
    } catch (error) {
        response.json({message: error.message});
    }
})

media_api_router.route(`${MEDIA_API_PREFIX}/download/:filename`).get(download_callback)

media_api_router.route(`${MEDIA_API_PREFIX}/remove/:filename`).delete(fileRemove)


module.exports = media_api_router













// ----------------------Pour test d'application de multiple Middlewares
// const specific_middleware1 = (request, response, next) => {
//     console.log('route specific middleware 1 ran!');
//     return next();
// };

// const specific_middleware2 = (request, response, next) => {
//     console.log('route specific middleware 2 ran!');
//     return next();
// };
// --------------------------------------------------------------------------
//----- multiple middlewares-------------------
// media_api_router.route(`${MEDIA_API_PREFIX}/download/:filename`).get({
//     middlewares: [specific_middleware1, specific_middleware2]
// },  download)