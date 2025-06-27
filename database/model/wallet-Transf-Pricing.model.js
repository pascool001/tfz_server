const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const docrefs = require('../database/mongodb/document_Refs');
// const { model } = require("mongoose");

const pricingRangeSchema = new Schema({
  tp_tax_mode: {type: String, required: true}, // % ou valeur
  tp_mtmin: {type: Number, required: true}, 
  tp_mtmax: {type: Number, required: true},
  tp_value: {type: Number, required: true}
});

const walletTransfPricingSchema = new Schema(
  {
    source_wallet: {type: Schema.Types.ObjectId, ref: 'wallet'},
    target_wallet: {type: Schema.Types.ObjectId, ref: 'wallet'},
    pricings: [pricingRangeSchema]
  },
  {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }
  }
);



module.exports = mongoose.model("walletTransferPricing", walletTransfPricingSchema);