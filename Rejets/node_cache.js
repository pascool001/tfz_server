const NodeCache = require( "node-cache" );

class MyCache {
    constructor(ttlSeconds) {
        if (MyCache.instance) {
            return MyCache.instance;
        }
        MyCache.instance = this;
        this.cache = new NodeCache({stdTTL: ttlSeconds, checkperiod: ttlSeconds*0.2, useClones: true})
        this.cache.on( "set", function( key, value ){

            console.log("set key: ", key, "   value : ", value, "    Date:  ", new Date())
        });
         this.cache.on( "expired", function( key, value ){
            console.log("expired : ", key, "   value : ", value,  "    Date:  ", new Date())
        });
    }

    get(key) {
        const value = this.cache.get(key);
        return value
    }

    set(key, data) {
        const value = this.cache.set(key, data, 15) // 15 seconds;
        return value
    }

}

module.exports = MyCache;