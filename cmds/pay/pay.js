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
				.setFooter("Command: pay <member> <amount>")
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
				.setFooter("Command: pay <member> <amount>")
		}if(sf == "nocommand") {
			return new RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setDescription(message.author + " "+ description)
				.setColor(value)
		}
	}
	let target = message.mentions.members.first(); //|| message.guild.members.get(args[1]);
	if(!target) return message.channel.send(embed("command", "red", "Veuillez mentionner quelqu'un à qui transferer de l'argent"));
	let add = parseInt(args[1]); //récup valeur
	if(!add) return message.channel.send(embedauthor("command", "red","Veuillez donner une somme à donner / payer"));
	
	if (target.id == message.author.id) return message.channel.send(embed("nocommand", "red", "Non, tu ne te transféras pas de l'argent à toi-même :rolling_eyes:"));
	let remove = add;
	const timeout = 1000;
	let msg = await message.channel.send(embed("nocommand", "orange", "Transaction en cours...."));
	
	connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql;
		
		if(rows.length < 1) {
			return;
		}else {
			let acoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${acoins - remove} WHERE id = '${message.author.id}'`;
		}
		connection.query(sql);
	});
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql; let sq1;
		
		if(rows.length < 1) {
			return;
		}else {
			let bcoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${bcoins + add} WHERE id = '${target.id}'`;
		}
		//connection.query(sql, sql);
		connection.query(sql);
	});

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		setTimeout(function(){
			if(rows.length < 1) { msg.delete(); return message.channel.send(embed("nocommand", "red", "Cet utilisateur n'est pas enregistré.")) };
			let bcoins = rows[0].coins;
			msg.delete();
			message.channel.send(embed("nocommand", "green", "Vous avez obtenu ¥**" + add + "** de la part de " + message.author));
		}, timeout);
	});
}

module.exports.help = {
	name: "pay"
}

// *pay @user 50