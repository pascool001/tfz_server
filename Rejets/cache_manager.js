// const NodeCache = require( "node-cache" );
const { createCache } = require("cache-manager")
const {Keyv, KeyvHooks} = require("keyv")
// const { KeyvGzip } = require('@keyv/compress-gzip')
// const Gzip = new KeyvGzip();

class CacheMan {
    constructor() {
        if (CacheMan.instance) {
            return CacheMan.instance;
        }
        CacheMan.instance = this;

        this.keyv = new Keyv({emitErrors:false})
        this.keyv.has()
        this.keyv.hooks.addHandler(
            KeyvHooks.POST_SET, 
            (key, value) => {
                console.log("Post_Set key: ", key, "   value : ", value, "  Date:  ", new Date())
                
                const timeoutId  = setTimeout( async () => {
                     const keyExist = await this.keyv.has(key)
                     if (!keyExist) {
                        console.log("deleted key: ", key, "  Date: ", new Date())
                        clearTimeout(timeoutId)
                     }
                }, 3000);
            }  
        );
        this.keyv.hooks.addHandler(
            KeyvHooks.POST_DELETE, 
            (key, value) => console.log("Post_delete key: ", key, "   value : ", value, "    Date:  ", new Date()) 
        );
        this.cache = createCache({
            stores:[this.keyv],
            ttl:900000
        })
                

        this.cache.on('set', ({ key, value, error }) => {
            console.log("set key: ", key, "   value : ", value, "    Date:  ", new Date())
        })

        // this.cache.on('del', ({ key, error }) => {
        //     console.log("del key: ", key, "   Date:  ", new Date())
        // })
    }

    async get(key) {
        const value = await this.cache.get(key);
        return value
    }

    async set(key, data) {
        const value = await this.cache.set(key, data, 10000) //  10 seconds;
        return value
    }

}

module.exports = CacheMan;