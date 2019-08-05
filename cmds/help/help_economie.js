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
				"\n**:money_mouth: Economie**\n \n" +
				PREFIX + "`pay+ <member> <amount>`: Ajouter des coins (mod only)\n" +
				PREFIX + "`pay- <member> <amount>`: Retirer des coins (mod only)\n" +
				PREFIX + "`pay <member> <amount>`: Payer quelqu'un (tranfert d'argent)\n" +
				PREFIX + "`money`: Afficher ses ¥\n" +
				PREFIX + "`xp`: Afficher ses XP\n" +
				PREFIX + "`&`: Afficher ses XP et ses ¥\n" +
				"\n**Exemple : " + PREFIX + "pay @user 100**\n"
		}
	});
}
module.exports.help = {
	name: "help_economie"
}