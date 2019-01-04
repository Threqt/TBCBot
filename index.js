const botconfig = require("./botconfig")
const Discord = require("discord.js")

bot.on("ready", async () => {
  console.log("ready to be ready")
});

bot.login(process.env.token);
