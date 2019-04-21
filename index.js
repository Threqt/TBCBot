const config = require("./botconfig");
const Discord = require("discord.js");

const bot = new Discord.Client({
  disableEverybody: true
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("over general so it doesen't get deleted again", {
    type: "WATCHING"
  });
});

bot.on("message", message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `botinfo` && message.channel.type != "dm") {
    const embed = new Discord.RichEmbed()
      .setAuthor(`Arc Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(`Bot Name`, `Arc Bot`, true)
      .addField(`Created On`, bot.user.createdAt)
      .addField(`Version`, `1.0.0`, true)
      .addField(`Developer`, `Threqt#4377`, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases", bot.user.avatarURL)
      .setTimestamp()
      .setColor(000000);

    return message.channel.send(embed)
  } else
  if (cmd === `serverinfo` && message.channel.type != "dm") {
    let sicon = message.guild.iconURL
    let online = message.guild.members.filter(m => m.presence.status !== 'offline').size
    let categories = message.guild.channels.filter(m => m.type === 'category').size
    let embed2 = new Discord.RichEmbed()
      .setAuthor("Arc Bot", bot.user.avatarURL)
      .setThumbnail(sicon)
      .addField("Owner", message.guild.owner, true)
      .addField("Created", message.guild.createdAt, true)
      .addField("Join Date", message.guild.joinedAt, true)
      .addField("Roles", message.guild.roles.size, true)
      .addField("Channels", message.guild.channels.size, true)
      .addField("Categories", categories, true)
      .addField("Region", message.guild.region, true)
      .addField("Total Members", message.guild.memberCount, true)
      .addField("Online Members", online, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases", bot.user.avatarURL)
      .setTimestamp();

    return message.channel.send(embed2)
  } else
  if (cmd === `answer` && message.channel.type === "dm") {
    let answers = ['1', 'bunnybot', '2', 'pokemon', '3', 'game of thrones']
    let rewards = ['1', 'gamer', '2', 'moon', '3', 'idiot']
    let ahh = message.content.slice(8, message.content.size)
    let question = ahh.slice(0, 1)
    let answer = ahh.slice(2, ahh.size).toLowerCase()
    let reward = ''
    for (let i = 0; i < answers.length; i++){
      if (question === answers[i]) {
        if (answer === answers[i + 1]) {
          reward = rewards[i + 1]
          return message.reply(`Great. One of the ciphers is ${reward}`)
        } else
        return message.reply(`Wrong answer, try again.`)
      }
    }
  }
});



bot.login(process.env.token);
