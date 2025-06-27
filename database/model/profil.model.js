const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilSchema = new Schema(
  {
    code_profil: {type: String, required: true, unique: true, enum: ["GERANT", "CHAUFFEUR", "CLIENT", "BO", "BO-ADMIN"]},
    desi_profil: {type: String, unique: true },
    desc_profil: {type: String, unique: true }, 
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    }
  }
);


module.exports = mongoose.model("profil", ProfilSchema);
