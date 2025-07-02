const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TransPricingSchema = new Schema({
  source_wallet: {type: Schema.Types.ObjectId, ref: 'wallet'},
  target_wallet: {type: Schema.Types.ObjectId, ref: 'wallet'},
  tp_tax_mode: {type: String, required: true}, // % ou valeur
  tp_mtmin: {type: Number, required: true}, 
  tp_mtmax: {type: Number, required: true},
  tp_value: {type: Number, required: true}
});


module.exports = mongoose.model("TransPricing", TransPricingSchema);