const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user'} , 
    service: { type: Schema.Types.ObjectId, ref: 'service', autopopulate: true} , 
    transfert: {type: Schema.Types.ObjectId, ref: 'transfer',  autopopulate: true} ,  
    nb_period: {type: Number, required: true},
    date_effet: {type: Date, required: true},
    date_exp: {type: Date, required: true},
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    },
    timestamps: true
  }
);

subscriptionSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("subscription", subscriptionSchema);