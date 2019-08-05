const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
	//if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de modifier votre inventaire.").then(m => m.delete(5000));
	let target = message.mentions.members.first(); // || message.guild.members.get(args[1]);
	if(!target) return message.channel.send("Veuillez mentionner quelqu'un à qui transférer un objet.");
	let str = parseInt(args[1]); //récup valeur //let str = args.join(" ");
	if(!str) return message.channel.send("Quel objet à transférer ? (Indiquer l'objet à transferer par son index).");
	if (target.id == message.author.id) return message.channel.send("Vous ne pouvez pas transferer un objet à vous même.")
	const timeout = 800;
	let msg = await message.channel.send("Transfert en cours...");
	var index = str;
	index--;
	//console.log(index);
	connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		var stock = rows[0].stock;
		if (rows.length < 1) return;
		if (stock.length < 1) {
            return message.channel.send("Inventaire vide. Vous ne pouvez donc rien transferer.");
		}else {
            var array = [];
			var array = stock.split('\n');
			var deleted = array.splice(index, 1);
			array = array.join('\n');
        	setTimeout(function(){
            	msg.delete();
        		message.channel.send(":clipboard: " + message.author + " ``" + deleted + " ``" + " a été supprimer de votre inventaire.");
			}, timeout);
		}
		//console.log("array :" + array)
		var sql0 = `UPDATE user SET stock = '${array}' WHERE id = '${message.author.id}'`;
		connection.query(sql0);
		//console.log("deleted :" + deleted);
		//----------------------------------------------------------------------------------------//
		
		connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
			if(err) throw err; //arrête le programme en cas d'erreur
			var stock0 = rows[0].stock;
			if(rows.length < 1) { msg.delete(); return message.channel.send("Cet utilisateur n'est pas enregistré.")};
			if (stock.length < 1) {
				var owo = deleted;
				//console.log("0, " + "owo :" + owo + " deleted :" + deleted);
			}else {
				var owo = stock0 + "\n" + deleted;
				//console.log("1, " + "stock :" + stock0 + "owo :" + owo + "deleted :" + deleted);
			}
			//console.log("3, " + owo);
			let sql = `UPDATE user SET stock = '${owo}' WHERE id = '${target.id}'`;
			connection.query(sql);
			message.channel.send(":clipboard: " + target + " Vous avez obtenu" + " ``" + deleted + "``" + " dans votre inventaire.");
		});
	});
}

module.exports.help = {
	name: "give_item"
}
