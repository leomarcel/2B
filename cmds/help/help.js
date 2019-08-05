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
				"Server prefix: " +PREFIX+
				"\n\n" +
				"**:stuck_out_tongue_winking_eye: General**\n" +
				"\n" +
				PREFIX + "`help_general`: Afficher l'aide général\n" +

				"**:money_mouth: Economie**\n" +
				"\n" +
				PREFIX + "`help_economie`: Afficher l'aide de l'économie" +
				"\n\n" +
				"**:shopping_bags: Item**\n" +
				"\n" +
				PREFIX + "`help_item`: Afficher l'aide de l'inventaire" +
				"\n\n" +
				"**:sunglasses: Help**\n"+
				"\n" +
				PREFIX + "`help_all`: Afficher tous les aides" +
				"\n\n" +
				PREFIX + ":cocktail: **Bar**\n" +
				"\n" +
				PREFIX + "`bar`: Affiche le bar\n"
		}
	});
}
module.exports.help = {
	name: "help"
}

