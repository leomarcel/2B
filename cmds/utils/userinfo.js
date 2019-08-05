const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setAuthor(message.author.username)
	.setDescription("Information Utilisateur")
	
	.addField("ID", message.author.id)
	.addField("Crée le ", message.author.createdAt)
	.addField("Tu es le", message.guild.memberCount)
	.setColor("#9B59B6")

	message.channel.send({embed: embed});
}

module.exports.help = {
	name: "userinfo"
}