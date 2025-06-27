const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicePricingSchema = new Schema(
  {
    periodicite: {type: String,  enum: ['DAY', 'MONTH', 'YEAR']}, 
    cout: {type: Number },
    devise: {type: String, default: 'FCFA'}
  })


const serviceSchema = new Schema(
  {
    name: {type: String, required: true}, 
    code: {type: String },
    desc: {type: String},
    toSuscribe: {type: Boolean, default: false},
    pricing: servicePricingSchema
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
          delete ret.createdAt;
          delete ret.updatedAt;
      }
    },
    timestamps: true
  }
);

// exemple sz services:
// -------------------------
// - Souscription appli transfiz client
// - Souscription appli transfiz transporteur
// - service suivi geolocalisé

module.exports = mongoose.model("service", serviceSchema);
