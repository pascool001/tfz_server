const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    name: {type: String },
    isActive: {type: Boolean, default: false },
    isVerified: {type: Boolean, default: false },
    isAdmin: {type: Boolean, default: false},
    phoneNumber: {type: String, required: true },
    userType: {type: String, enum: ['WEB', 'MOBILE'], default: "MOBILE"},
    imageRef: {type: String },
    profil: [{type: Schema.Types.ObjectId, ref: 'profil'}],
    country: {type: Schema.Types.ObjectId, ref: 'country'},
    smp_associes: [{type: Schema.Types.ObjectId, ref: 'spm'}], //Les Ids de SPM aux quels le user (chauffeur) est associé
    user_accounts: [{type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}]
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.password;
          delete ret.__v;
      }
    },
    timestamps: true
  }
);


userSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("user", userSchema);
