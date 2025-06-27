const mongoose = require('mongoose');

const grid = require('gridfs-stream');


let gfs, gridfsBucket;

(() => {
  mongoose.connection.on("connected", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
    gfs = grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();

