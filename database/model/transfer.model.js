const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const transferSchema = new Schema({
  transfert_type: { type: Schema.Types.ObjectId, ref: 'trans_type', autopopulate: true},
  src_account: { type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}, 
  target_account: { type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}, 
  transfert_amount: {type: Number, required: true},
  transfer_status:  {type: String, enum:['pending', 'success', 'error'], default: 'pending'},
  transfert_response: {type: Schema.Types.Mixed},
 
}, {
  toJSON: {
    transform(doc, ret) {
        delete ret.__v;
    }
  },
  timestamps: true
})

transferSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("transfer", transferSchema);
