const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(message.author + " Mentionner quelqu'un à qui donner un verre d'eau | `!eau <user>` :milk:");
    
    if (target == message.author) {
        message.channel.send(new RichEmbed().setDescription("**Eau ! :milk: **\n" + message.author + " à pris un verre d'eau ! :milk:").setColor(1752220))
    } else {
        message.channel.send(new RichEmbed().setDescription("**Eau ! :milk: **\n" + message.author + " a pris pour " + target + " un verre d'eau ! :milk:").setColor(1752220));
    }
}

module.exports.help = {
	name: "eau"
}