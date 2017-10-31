const Pokemon = require("../models/pokemon");
const config  = require("../config.json");

exports.run = (client, message, args) => {
  let alias = args.shift();
  if (!alias) return message.channel.send(
    "Tu dois saisir un identifiant ou un nom, par exemple `" + config.prefix + "pdx abra`."
  );

  alias = alias.toLowerCase();

  Pokemon
    .findOne({
      $or: [
        {"name": alias},
        {"local_name": alias},
        {"id": parseInt(alias) || 0}
      ]
    })
    .populate("_evolution_candy")
    .exec(function(err, pokemon) {
      if (err) return console.error(err);
      if (null === pokemon) return message.channel.send(
        "Il n'y a aucune entrée dans le Pokédex pour le nom ou l'identifiant `" + alias + "`."
      );

      let finalId = ("000" + pokemon.id).substr(pokemon.id.toString().length);

      let informations = "**#" + finalId + " " + pokemon.name.toUpperCase() + " - GEN " + pokemon.generation + "** \n";

      if (pokemon.weight) {
        informations += "Poids : `" + pokemon.weight + "kg` ";
      }
      if (pokemon.height) {
        informations += "Taille : `" + pokemon.height + "m`";
      }
      if (pokemon.weight || pokemon.height) informations += "\n";

      if (pokemon.types.length) {
        if (pokemon.types.length > 1) {
          informations += "Types :";
        } else {
          informations += "Type :";
        }
        pokemon.types.forEach(function (type) {
          informations += " `" + type + "`";
        });
      }

      // "**EVOLUTION**: CHARMANDER -> CHARMELEON -> CHARIZARD \n" +

      if (pokemon.description) {
        informations += "\n```" + pokemon.description + "```";
      }

      informations += "-------\n";

      if (pokemon.evolution_cost) {
        let candy = pokemon;
        if (pokemon._evolution_candy) {
          candy = pokemon._evolution_candy;
        }
        informations += "Coût d'évolution : `" + pokemon.evolution_cost + " bonbons " + candy.name + "` \n";
      }

      if (pokemon.hatches_from) {
        informations += "Eclos d'un oeuf `" + pokemon.hatches_from + "km`\n";
      }

      if (pokemon.max_cp && pokemon.max_cp_20 && pokemon.max_cp_30) {
        informations += "PC max (Lvl 20/30/40) : `" +
          pokemon.max_cp_20 + "`/`" + pokemon.max_cp_30 + "`/`" + pokemon.max_cp + "`\n";
      }

      if (pokemon.attack && pokemon.defense && pokemon.stamina) {
        informations += "Statistiques (Att/Def/End) : `" +
          pokemon.attack + "`/`" + pokemon.defense + "`/`" + pokemon.stamina + "`";
      }

      return message.channel.send(informations);
    })
  ;
};
