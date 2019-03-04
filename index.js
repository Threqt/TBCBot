const config = require("./botconfig");
const Discord = require("discord.js");

const bot = new Discord.Client({
  disableEverybody: true
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("over JBM", {
    type: "WATCHING"
  });
});

bot.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `ping`) {
    return message.channel.send("pong");
  } else
  if (cmd === `botinfo`) {
    const embed = new Discord.RichEmbed()
      .setAuthor(`JBM Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(`Bot Name`, `JBM Bot`, true)
      .addField(`Created On`, bot.user.createdAt)
      .addField(`Version`, `1.0.0`, true)
      .addField(`Developer`, `Threqt#3799`, true)
      .setFooter("Prefix: ! | This bot is still in it's early phases", bot.user.avatarURL)
      .setTimestamp()
      .setColor(000000);

    return message.channel.send(embed)
  } else
  if (cmd === `serverinfo`) {
    let sicon = message.guild.iconURL
    let online = message.guild.members.filter(m => m.presence.status !== 'offline').size
    let categories = message.guild.channels.filter(m => m.type === 'category').size
    let embed2 = new Discord.RichEmbed()
      .setAuthor("JBM Bot", bot.user.avatarURL)
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
  if (cmd === `auction`){
    let auctionrole = message.guild.roles.find(`name`, `[Auction Bidder]`)
    if(message.member.has(auctionrole.id)){
      message.member.removeRole(auctionrole.id).then(messag => {
        return message.reply("Successfully removed role Auction Bidder from you")
      })
    }
    message.member.addRole(auctionrole.id).then(messag => {
      return message.reply("Successfully added role Auction Bidder to you")
    })
  }
});

bot.login(process.env.token);
