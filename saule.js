const Discord = require("discord.js");
const fs = require("fs")
const client = new Discord.Client();
const config = require("./config.json");

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
});

client.login(config.token);
