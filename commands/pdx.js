const pokedex = require("../pokedex.json");

exports.run = (client, message, args) => {
  let alias = args.shift().toLowerCase();
  let pokemon = undefined;

  if (alias in pokedex.pokemon) {
    pokemon = pokedex.pokemon[alias];
  } else {
    let BreakException = {};
    Object.keys(pokedex.pokemon).forEach(function (item) {
      try {
        if (
          pokedex.pokemon[item].id === parseInt(alias) ||
          pokedex.pokemon[item].locale_name.toLowerCase() === alias ||
          pokedex.pokemon[item].name.toLowerCase() === alias
        ) {
          pokemon = pokedex.pokemon[item];
          throw BreakException;
        }
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    })
  }

  if (undefined !== pokemon) {
    message.channel.send(
      "**#" + pokemon.id +" " + pokemon.name.toUpperCase() + " - GEN 1** \n" +
      "Poids : `" + pokemon.weight + "kg` Taille : `" + pokemon.height + "m` \n" +
      "Type: `Feu` \n" +
      "**EVOLUTION**: CHARMANDER -> CHARMELEON -> CHARIZARD \n" +
      "```" + pokemon.description + "``` \n" +
      "------- \n" +
      "Coût d'évolution : `25 Charmander bonbons` \n" +
      "PC max (lvl 20 | 30 | 40) : `" + pokemon.max_cp_20 + "`  | `" + pokemon.max_cp_30 + "` | `" + pokemon.max_cp + "` \n" +
      "Stats (ATT | DEF | RES) : `" + pokemon.att + "`  | `" + pokemon.def + "` | `" + pokemon.sta + "` \n" +
      "-------"
    );
  } else {
    message.channel.send("Il n'y a aucune entrée dans le Pokédex pour la valeur `" + alias + "`.");
  }
}