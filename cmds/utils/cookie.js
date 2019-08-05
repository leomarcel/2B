const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(message.author + " Mentionner quelqu'un à qui donner un Cookie | `!cookie <user>` :cookie:");
    
    if (target == message.author) {
        message.channel.send(new RichEmbed().setDescription("**Cookie ! :cookie:**\n" + message.author + " s'est offert un Cookie à lui-même ! :cookie:").setColor(1752220))
    } else {
        message.channel.send(new RichEmbed().setDescription("**Cookie ! :cookie:**\n" + message.author + " a offert à " + target + " un Cookie !").setColor(1752220));
    }
}

module.exports.help = {
	name: "cookie"
}