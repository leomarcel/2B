const { RichEmbed } = require("discord.js");
const PREFIX = "*";
/*
module.exports.run = async (bot, message, args, con) => {
	try {
		await message.author.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`);
		message.channel.send("Help sent.");
	} catch(e) {
		message.channel.send("Could not send you a DM.");
	}
}
*/
module.exports.run = async (bot, message, args, connection) => {
	message.channel.send( {
		embed: {
			color: 1752220,
			description: "**Commands List**\n" +
				"Server prefix: " +PREFIX+ "\n" +
				"\n**:shopping_bags: Economie**\n \n" +
				PREFIX + "`item++`: Ajouter un objet dans son inventaire\n" +
				PREFIX + "`item--`: Ajouter un objet dans son inventaire\n" +
				PREFIX + "`item`: Afficher son inventaire\n" +
				PREFIX + "`give_item`: Transferer un objet de inventaire\n\n"
		}
	});
}
module.exports.help = {
	name: "help_item"
}