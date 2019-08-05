const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
	function embed(sf, value, description) {
		let targets = message.mentions.members.first() || message.guild.members.get(args[1]);
		if (targets == undefined) targets = message.author;
		if (value == "green") value = 3066993;
		if (value == "red") value = 15158332;
		if (value == "orange") value = 11027200;
		if(sf == "command") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(targets + " "+ description)
				.setColor(value)
				.setFooter("Command: pay- <member> <amount>")
		}if(sf == "nocommand") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(targets + " "+ description)
				.setColor(value)
		}
	}
	function embedauthor(sf, value, description) {
		if (value == "green") value = 3066993;
		if (value == "red") value = 15158332;
		if (value == "orange") value = 11027200;
		if(sf == "command") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(message.author + " "+ description)
				.setColor(value)
				.setFooter("Command: pay- <member> <amount>")
		}if(sf == "nocommand") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(message.author + " "+ description)
				.setColor(value)
		}
	
	}

	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embedauthor("nocommand", "red", "Vous n'avez pas la permission de donner ou de retirer de l'argent à autrui."));
	let target = message.mentions.members.first() || message.guild.members.get(args[1]);
	if(!target) return message.channel.send(embed("command", "red", "Veuillez mentionner quelqu'un à qui donner ou retirer de l'argent"));
	let remove = parseInt(args[1]); //récup valeur
	if(!remove) return message.channel.send(embedauthor("command", "red", "Veuillez donner une somme à donner ou à retirer"));
	const timeout = 1000;
	let msg = await message.channel.send(embed("nocommand", "orange", "Transaction en cours...."));
	
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql;
		
		if(rows.length < 1) {
			return;
		}else {
			let acoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${acoins - remove} WHERE id = '${target.id}'`;
		}
		connection.query(sql);
	});

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(rows.length < 1) { msg.delete(); return message.channel.send(embed("nocommand", "red", "Cet utilisateur n'est pas enregistré.")) };
		let bcoins = rows[0].coins;
		bcoins = bcoins - remove;
		setTimeout(function(){
			msg.delete();
			message.channel.send(embed("nocommand","green", ":white_check_mark: **¥" + remove + "** vous on était retirée. \n Vous avez maintenant **¥" + bcoins + "** ! :moneybag:"));
		}, timeout);
	});
}

module.exports.help = {
	name: "pay-"
}
