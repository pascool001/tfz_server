const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const docrefs = require('../database/mongodb/document_Refs');
// const { model } = require("mongoose");

// const tranchesSchema = new Schema({
//   tp_tax_mode: {type: String, required: true}, // % ou valeur
//   tp_mtmin: {type: Number, required: true}, 
//   tp_mtmax: {type: Number, required: true},
//   tp_value: {type: Number, required: true}
// });

const walletSchema = new Schema(
  {
    wallet_name: {type: String, unique: true }, 
    wallet_logo_filename: {type: String},
    wallet_logo: {type: String}, 
    country: {type: Schema.Types.ObjectId, ref: 'country'},
  },
  {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }
  }
);



module.exports = mongoose.model("wallet", walletSchema);