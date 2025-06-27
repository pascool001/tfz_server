const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const transPricingSchema = new Schema({
//   mode: {type:String, require: true, default: "PCTG"}, // PCTG ou VALUE
//   mtmin: {type: Number, require: true},
//   mtmax: {type: Number, require: true},
//   value: {type: Number, require: true},
// })

const transferTypeSchema = new Schema({
  designation: {type: String, require: true},
  // pricing: [transPricingSchema]
})

// transferTypeSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("transferType", transferTypeSchema);
