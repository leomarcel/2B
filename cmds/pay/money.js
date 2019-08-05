const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	let target = message.mentions.users.first() || message.author;
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;
		let pp = message.mentions.users.first() || message.author;
		if(rows.length < 1) return message.channel.send(embed("nocommand", "red", "Cet utilisateur n'est pas enregistré."));
		if(!rows[0].coins) return message.channel.send(new RichEmbed()
		.setAuthor(`${pp.username}#${pp.discriminator}`, pp.avatarURL)
		.setDescription("Ton porte monaie est vide ! :moneybag:")
		.setColor(15158332)
		.setTimestamp()
		)

		let coins = rows[0].coins;

		message.channel.send(new RichEmbed()
			.setAuthor(`${pp.username}#${pp.discriminator}`, pp.avatarURL)
			.setDescription(target + " has : **¥" + coins + "** ! :moneybag:")
			.setTimestamp()
			.setColor(3066993)
		)
	});
}

module.exports.help = {
	name: "money"
}