const mongoose = require("mongoose");

const Grid = require('gridfs-stream');

require('dotenv').config()

const genAdminUser = require('./generateAdminUser')
const genProfils = require('./generateProfils')


const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    await genProfils()
    await genAdminUser()
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


let gfs;
(() => {
  mongoose.connection.on("connected", () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();


module.exports = {connectDB, gfs};
