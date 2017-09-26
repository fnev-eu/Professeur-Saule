const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const config = require("./config.json");
const pokedex = require("./pokedex.json");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong!");
  }

  if (message.content.startsWith(config.prefix + "prefix")) {
    if (message.author.id !== config.ownerID) return;

    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    if (newPrefix === undefined) return;
    config.prefix = newPrefix;
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send("Le nouveau préfixe est `" + config.prefix + "`.");
  }

  if (message.content.startsWith(config.prefix + "pdx")) {
    let alias = message.content.split(" ").slice(1, 2)[0].toLowerCase();
    let pokemon = undefined;

    if (alias in pokedex.pokemon) {
      pokemon = pokedex.pokemon[alias];
    } else {
      var BreakException = {};
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
});

client.login(config.token);
