const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caisseAlternSchema = new Schema({
  caisse: {type: Schema.Types.ObjectId, ref: 'account', autopopulate:true},
  active: {type: Boolean, require: true, default: false}
})

const vehiculeSchema = new Schema({
  immatriculation: {type: String},
  num_carte_grise: {type: String},
  img_carte_grise: {type: String},
  num_carte_trans: {type: String},
  img_carte_trans: {type: String}
})


const spmSchema = new Schema(
  {
    code_spm: {type: String, required: true, unique: true}, // code à générer 
    mode_caisse: {type: String, required: true, default: "centrale" }, // caisse centralisée ou alternée (centrale/alterne)
    isActive: {type: Boolean, default: false}, // remis à true au terme du processus de l'acquisition (car la souscription est différée) et à false au terme de la période d'essaie
    souscription_differe: {type: Boolean, default: true}, // ?? periode différée de souscription, remise à false à la souscription
    acquereur: {type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}, // reférence de l'acquereur à spécifier au moment de l'acquisition
    code_admin: {type: String, required: true, unique: true}, // code (otp) d'administrateur du spm generé à, l'édition
    code_chauf: {type: String, required: true, unique: true}, // code (otp) d'invitation / association de , generé à, l'édition
    chauf_associes: [{type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}], //Ids des chauffeurs associés
    caisse_central: {type: Schema.Types.ObjectId, ref: 'account', autopopulate: true},
    caisses_alternees:[caisseAlternSchema],
    infos_vehicule:[vehiculeSchema]
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    }
  }
);

spmSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("spm", spmSchema);
