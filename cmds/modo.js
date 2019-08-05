const { RichEmbed } = require("discord.js");
const PREFIX = "!";
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
				"\n**:muscle: Modération**\n \n" +
				PREFIX + "`kick` *@user* *raison*: Kick un utilisateur\n" +
				PREFIX + "`ban` *@user* *raison*: Ban un utilisateur\n" +
				PREFIX + "`unban` *@user* : Unban un utilisateur\n" +
				PREFIX + "`mute` *@user* : Mute un utilisateur\n" +
				PREFIX + "`unmute` *@user* : Unmute un utilisateur\n" +
				PREFIX + "`prune` *nombre* : Supprime *nombre* messages\n" +
				PREFIX + "`StopBot!`: Destruction du monde du Bot\n"
		}
	});
}
module.exports.help = {
	name: "modo"
}