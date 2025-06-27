const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    country_indic: {type: String, required: true, unique: true}, // indicatif du pays (+225)
    country_code: {type: String, unique: true }, // code du pays (CI: Cote d'Ivoire)
    country_name: {type: String, unique: true }, 
    country_flag: {type: String}, //image du drapeau
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    }
  }
);

// countrySchema.pre("save", (next) => {
//   this.country_flag = `https://flagsapi.com/${this.country_code}/flat/64.png`
//   next()
// })


module.exports = mongoose.model("country", countrySchema);
