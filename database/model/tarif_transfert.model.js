const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tranche_tarifaire = new Schema({
  tp_tax_mode: {type: String, required: true}, // % ou valeur
  tp_mtmin: {type: Number, required: true}, 
  tp_mtmax: {type: Number, required: true},
  tp_value: {type: Number, required: true}
});

const Transfert_tarif_schema = new Schema({
    wallet_Source : {type: Schema.Types.ObjectId, ref: "wallet"},
    wallet_target : {type: Schema.Types.ObjectId, ref: "wallet"},
    tranche_Tarifaire: [tranche_tarifaire]
})

module.exports= mongoose.model("tarif_transfert", Transfert_tarif_schema)