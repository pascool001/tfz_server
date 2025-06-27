const MyNodeCache = require("./node_cache")
const stdTTL = process.env.NODE_CACHE_STDTTL
console.log("stdTTL : ", stdTTL)
const singletonInstance = new MyNodeCache(stdTTL);

module.exports = singletonInstance;