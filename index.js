const config = require("./botconfig");
const Discord = require("discord.js");
var version = "v0.1"
var updateno = "1"
const bot = new Discord.Client({
  disableEverybody: true
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("over Tumbleweed", {
    type: "WATCHING"
  });
});

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + ` has joined`)
  var role = member.guild.roles.find('name', 'Citizen')
  member.addRole(role)
});


bot.on("message", message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `botinfo` && message.channel.type != "dm") {
    const embed = new Discord.RichEmbed()
      .setAuthor(`Tumbleweed Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(`Bot Name`, `Tumbleweed Bot`, true)
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
      .setAuthor("Tumbleweed Bot", bot.user.avatarURL)
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
  if(cmd === `update`){
    let role = message.member.guild.roles.find('name', 'Mr.Bot')
    if(message.member.roles.has(role.id)){
      message.delete()
      let update = new Discord.RichEmbed()
        .setAuthor("Tumbleweed Bot", bot.user.avatarURL)
        .setThumbnail(bot.user.avatarURL)
        .setTitle(`Update Number ${updateno} | Version Number ${version}`)
        //•
        .setDescription("Update Details: \n • Added autorole to the bot \n • Added update command to keep people informed on updates \n \n Planned features: \n • Poll command \n • Autorole using emojis \n • Chat moderation")
        .setFooter(`Prefix: ! | Tumbleweed Bot | ${version}`, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(update)
    }
  }
});



bot.login(process.env.token);
