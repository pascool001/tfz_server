const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docrefs = require('../database/mongodb/document_Refs');
const { model } = require("mongoose");

const tranchesSchema = new Schema({
  tp_tax_mode: {type: String, required: true}, 
  tp_mtmin: {type: Number, required: true}, 
  tp_mtmax: {type: Number, required: true},
  tp_value: {type: Number, required: true}
});


const tarifSchema = new Schema({
  designation: {type: String}, // ex: tarification sur le canal Orange/ moov/ Mtn
  tranche_tarifaire_bedoo_entrant: [tranchesSchema],
  tranche_tarifaire_bedoo_sortant: [tranchesSchema],
  tranche_tarifaire_operator_sortant: [tranchesSchema],
  tranche_tarifaire_operator_sortant: [tranchesSchema],
})



const operatorSchema = new Schema(
  {
    oper_name: {type: String, unique: true }, 
    oper_logo_filename: {type: String}, 
    oper_logo: {type: String},
    pricing: tarifSchema,
    country: {type: Schema.Types.ObjectId, ref: 'country'},
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
          delete ret.createdAt;
          delete ret.updatedAt;
      }
    }
  }
);



operatorSchema.plugin(require('mongoose-autopopulate'))

operatorSchema.post("save", async function(doc) {
  docrefs.RefOperatorToCountry(doc._id, doc.country)
  if (doc.country) await doc.populate({ 
    path: 'country', 
    model: 'country',
    select: "-country_operators", 
  })
})

operatorSchema.post("findOneAndDelete", function(doc, next) {
  docrefs.DelOpeRefFromCountry(doc._id, doc.country)
  next()
})


operatorSchema.post('findOne', async function(doc){
  if (doc.country) {
    await doc.populate({ 
      path: 'country',
      model: 'country',
      select: '-country_operators'
    })
  } 
})

operatorSchema.post("find", async (docs) => {
  for (const doc of docs) {
    if (doc.country)  await doc.populate({ 
      path: 'country', 
      model: 'country',
      select: "-country_operators"
    });
  }
})


module.exports = mongoose.model("operator", operatorSchema);