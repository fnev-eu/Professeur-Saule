const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  id: {type: Number, min: 1, index: {unique: true}},
  name: {type: String, index: {unique: true}},
  local_name: {type: String, index: {unique: true}},
  description: {type: String},
  generation: {type: Number, min: 1, max: 6},
  height: {type: Number},
  weight: {type: Number},
  types: {type: Array},
  genus: {type: String},
  max_cp: {type: Number},
  max_cp_20: {type: Number},
  max_cp_30: {type: Number},
  attack: {type: Number, min: 0},
  defense: {type: Number, min: 0},
  stamina: {type: Number, min: 0},
  evolutions: {type: Array},
  evolution_cost: {type: Number, min: 1},
  _evolution_candy: {type: Schema.ObjectId, ref: "Pokemon" },
  hatches_from: {type: Number},
  nests: {type: Array}
});

PokemonSchema.index({id: 1, name: 1, local_name: 1,});

const Pokemon = global.db.model("Pokemon", PokemonSchema);

module.exports = Pokemon;
