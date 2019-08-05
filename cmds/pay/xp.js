const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	function embed(sf, value, description) {
		if (value == "green") value = 3066993;
		if (value == "red") value = 15158332;
		if (value == "orange") value = 11027200;
		if(sf == "command") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(message.author + " "+ description)
				.setColor(value)
				.setFooter("Command: xp <member>")
		}if(sf == "nocommand") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(message.author + " "+ description)
				.setColor(value)
		}
	}
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
	let pp = message.mentions.users.first() || message.author;

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;
		if(rows.length < 1) return message.channel.send(embed("nocommand", "red", "Cet utilisateur n'est pas enregistré."));
		if(!rows[0].xp) return message.channel.send("This user has no XP on record.");
		let xp = rows[0].xp;

		message.channel.send(new RichEmbed()
		.setDescription(target + " has : **" + xp + " XP**")
		.setAuthor(`${pp.username}#${pp.discriminator}`, pp.avatarURL)
		.setTimestamp()
		.setColor(3066993)
		)
	});
}

module.exports.help = {
	name: "xp"
}