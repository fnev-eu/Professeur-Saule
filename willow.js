const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.log(err);
  }
});

client.login(config.token);
