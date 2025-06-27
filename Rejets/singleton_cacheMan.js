const MyCache = require("./cache_manager")
// const stdTTL = process.env.NODE_CACHE_STDTTL
// console.log("stdTTL : ", stdTTL)
const singletonInstance = new MyCache();

module.exports = singletonInstance;