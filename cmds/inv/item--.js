const { RichEmbed } = require("discord.js");

function generateXP() { //algo evo xp
	let min = 20; let max = 30;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initial(){
	let init = 200;
	return init;
}

module.exports.run = async (bot, message, args, connection) => {
	//if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de modifier votre inventaire.").then(m => m.delete(5000));
	let target = message.mentions.members.first() || message.guild.members.get(args[1]) || message.author;
	if(!target) return message.channel.send("Veuillez mentionner quelqu'un à qui donner ou retirer de l'argent").then(m => m.delete(5000));
	if (!target) target = message.author;
	const timeout = 800;

	let str = args.join(" ");
	if(!str) return message.channel.send("Quel objet ? (Indiquer l'objet à supprimer par son index)."); //demande
	let msg = await message.channel.send("Modification dans votre inventaire en cours...");
    var index = str;
    index--;
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		var stock = rows[0].stock;
		if (rows.length < 1) return;
		if (stock.length < 1) {
            return message.channel.send("Inventaire vide. Vous ne pouvez donc rien supprimer.")
		}else {
            var array = [];
			var array = stock.split('\n');
			deleted = array.splice(index, 1);
			array = array.join('\n');
        	setTimeout(function(){
            	msg.delete();
        		message.channel.send(":clipboard: " + target + " ``" + deleted + " ``" + " a été supprimer de votre inventaire.");
			}, timeout);
		}
		let sql = `UPDATE user SET stock = '${array}' WHERE id = '${target.id}'`;
       connection.query(sql);
    });
}

module.exports.help = {
	name: "item--"
}
