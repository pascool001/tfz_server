const MyCache = require("./keyv_cache")

const singletonInstance = new MyCache();

module.exports = singletonInstance;