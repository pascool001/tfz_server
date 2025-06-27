const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server()
const { sse } = require('./middlewares')
require('dotenv').config()
const port = process.env.SERVER_PORT;
const root_api_prefix = process.env.ROOT_API_PREFIX
const cors = require('cors')
const path = require('path')

const {connectDB} = require('./database/mongodb/connection');
const LiveDirectory = require('live-directory');

const LiveAssets = new LiveDirectory(path.join(__dirname, 'public'), {
     filter: {
        keep: {
            extensions: ['css', 'js', 'json', 'png', 'jpg', 'jpeg']
        },
        ignore: (path) => {
            return path.startsWith('.');
        }
    },
    cache: {
        max_file_count: 250, // Files will only be cached up to 250 MB of memory usage
        max_file_size: 1024 * 1024,
    }
    })
// Create static serve route to serve frontend assets
    webserver.get('/assets/*', (request, response) => {

    
    // Strip away '/assets' from the request path to get asset relative path
    // Lookup LiveFile instance from our LiveDirectory instance.
    const path = request.path.replace('/assets', '');
    const file = LiveAssets.get(path);
    
    // Return a 404 if no asset/file exists on the derived path
    if (file === undefined) return response.status(404).send();

    const fileParts = file.path.split(".");
    const extension = fileParts[fileParts.length - 1];

    // Retrieve the file content and serve it depending on the type of content available for this file
    const content = file.content;
    if (content instanceof Buffer) {
        // Set appropriate mime-type and serve file content Buffer as response body (This means that the file content was cached in memory)
        return response.type(extension).send(content);
    } else {
        // Set the type and stream the content as the response body (This means that the file content was NOT cached in memory)
        return response.type(extension).stream(content);
    }
});
// connection de la base de données

connectDB()

webserver.use(cors({}))

// webserver.use('/static', webserver.static('public'))


webserver.use(sse())

webserver.get(`${root_api_prefix}/sse`, (request, response) => {
    response.initStream()
})

Object.keys( require('./routes') ).forEach(key => {
   webserver.use(`${root_api_prefix}`, require('./routes')[key]);
} )

webserver.listen(port || 5000, 'localhost').then(() => {
    console.log(`Webserver started on port ${port}`)
})
.catch(err => console.log('Failed to start webserver'))