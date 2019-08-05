const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
	//if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de modifier votre inventaire.").then(m => m.delete(5000));
	let target = message.mentions.members.first() || message.guild.members.get(args[1]) || message.author;
	if(!target) return message.channel.send("Veuillez mentionner quelqu'un à qui donner ou retirer de l'argent").then(m => m.delete(5000));
	if (!target) target = message.author;
	const timeout = 800;
	
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql;
		var id = rows[0].id;
		if ((!id) || (id.length < 1)) return message.channel.send("Utilisateur non enregistrer.")
		var stock = rows[0].stock;
		if (stock.length < 1) return message.channel.send("Votre inventaire est déjà vide.");
		else {
			var owo = '';
			sql = `UPDATE user SET stock = '${owo}' WHERE id = '${target.id}'`;
			message.channel.send("Inventaire vider.");
		}
		connection.query(sql);
	});
}

module.exports.help = {
	name: "clear"
}
