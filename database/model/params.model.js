const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parametreSchema = new Schema(
  {
    param_code: {type: String, unique: true },
    param_desc: {type: String},
    param_value: {type: Schema.Types.Mixed}, 
  }
);

// ex objet {param_code: "tfz_sous_diff", param_desc: "Délais de differement de souscription", param_value: "60J"}

module.exports = mongoose.model("parametre", parametreSchema);
