const {Keyv, KeyvHooks} = require("keyv")
// const { KeyvGzip } = require('@keyv/compress-gzip')
// const Gzip = new KeyvGzip();

class KeyvCache {
    #Tokencache;
    #Tranfertcache;
    constructor() {
        
        if (KeyvCache.instance) {
            return KeyvCache.instance;
        }

        KeyvCache.instance = this;

        this.#Tokencache = new Keyv({ttl: 600000, namespace: 'token'}) //5m / 900 sec ou 15 minutes
        this.#Tranfertcache = new Keyv({ttl: 900000, namespace: 'transfert'}) //900 sec ou 15 minutes
        

        this.#Tokencache.hooks.addHandler(KeyvHooks.POST_SET, (key, value) => {
            console.log("POST_SET kEY: ", key, "  Date:", new Date().toISOString())
        });

        this.#Tokencache.hooks.addHandler(KeyvHooks.POST_DELETE, (key, value) => {
            // console.log("Post_delete key: ", key, "  Date: ", new Date().toISOString()) 
        });
        
    }

    async getTokenData(key) {
        return await this.#Tokencache.get(key);
    }

    async setTokenData(key, data) {
        await this.#Tokencache.set(key, data) //  10 seconds;
        let cached = await this.getTokenData(key)
        return cached
    }

     async setDataIfNotExist(key, data) {
        if (!(await this.getTokenData(key))) {
            await this.#Tokencache.set(key, data) 
        }
    }

    async getTranfertData(key) {
        const value = await this.#Tranfertcache.get(key);
        return value
    }

    async setTransfertData(key, data) {
        const value = await this.#Tranfertcache.set(key, data) //  10 seconds;
        return value
    }

}

module.exports = KeyvCache;