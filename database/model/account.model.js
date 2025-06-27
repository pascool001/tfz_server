const mongoose = require("mongoose");
// const document_Refs = require("../mongodb/document_Refs");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    wallet: { type: Schema.Types.ObjectId, ref: 'wallet'},
    account_number: {type: String, required: true}, 
    account_Type: {type: String, enum:["ORDINARY", "MARCHANT"], default: "ORDINARY"}, // cpt_tfz(marchant) / ordinairy
    cash_account: {type: Boolean, default: false}, // ce compte est-il un compte caisse? 
    recovery_account: {type: String, required: true}, // numero de compte de recuperation
  }, {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    },
    timestamps: true
  }
);

// accountSchema.post("save", async function(doc, next) {
//   document_Refs.RefAccountToUser(doc._id, doc.user)
//   next()
// })

// accountSchema.post("findOneAndDelete", function(doc, next) {
//   document_Refs.DelAccRefFromUser(doc._id, doc.user)
//   next()
// })



// accountSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("account", accountSchema);

