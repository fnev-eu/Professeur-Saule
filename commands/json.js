const fs      = require("fs");
const config  = require("../config.json");
const Pokemon = require("../models/pokemon");
const json    = require("../pokedex.json");

exports.run = (client, message, args) => {
  if (message.author.id !== config.ownerID) return;

  message.channel.send("Import en cours...");

  const pokedex = json.pokemon;

  Object.keys(pokedex).forEach(function (item) {
    Pokemon
    .findOne({
      "id": pokedex[item].id
    })
    .exec(function(err, pokemon) {
      if (null === pokemon) {
        let pokemon = new Pokemon({
          id: pokedex[item].id ? pokedex[item].id: null,
          name: pokedex[item].name ? pokedex[item].name: null,
          local_name: pokedex[item].locale_name ? pokedex[item].locale_name: null,
          description: pokedex[item].description ? pokedex[item].description: null,
          generation: pokedex[item].generation ? pokedex[item].generation: null,
          height: pokedex[item].height ? pokedex[item].height: null,
          weight: pokedex[item].weight ? pokedex[item].weight: null,
          types: pokedex[item].types ? pokedex[item].types: null,
          genus: pokedex[item].genus ? pokedex[item].genus: null,
          max_cp: pokedex[item].max_cp ? pokedex[item].max_cp: null,
          max_cp_20: pokedex[item].max_cp_20 ? pokedex[item].max_cp_20: null,
          max_cp_30: pokedex[item].max_cp_30 ? pokedex[item].max_cp_30: null,
          attack: pokedex[item].att ? pokedex[item].att: null,
          defense: pokedex[item].def ? pokedex[item].def: null,
          stamina: pokedex[item].sta ? pokedex[item].sta: null,
          evolution_cost: pokedex[item].evolution_cost ? pokedex[item].evolution_cost: null,
          hatches_from: pokedex[item].hatches_from ? pokedex[item].hatches_from: null
        });

        pokemon.save(function(err, pokemon) {
          if (err) return console.log("Err: " + err);
          console.log("Import de " + pokemon.name + " terminé.");
        });
      }
    });
  });

  return message.channel.send("Import terminé.");
};
