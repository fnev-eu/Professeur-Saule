const fs = require("fs");
const config = require("../config.json");

exports.run = (client, message, args) => {
  if (message.author.id !== config.ownerID) return;

  let newPrefix = args.shift();

  if (undefined === newPrefix) return;

  config.prefix = newPrefix;
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  message.channel.send("Le nouveau préfixe est `" + config.prefix + "`.");
};
