const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) return;
		var stock = rows[0].stock;
		if (stock.length < 1) return message.channel.send("Votre inventaire est vide.");
		var array = stock.split('\n'); //char 'stock' => array
		var owo = [];
		array.forEach((element, i) => {
			owo.push(`${i + 1}: ${"``" + element + "``"}`);
		})
		owo = owo.join('\n');
		//console.log("o:" + owo);
		message.channel.send(new RichEmbed().setDescription(":clipboard: **Inventaire de " + target + " :** \n\n" + owo).setColor("#daa520"));
	});
}

module.exports.help = {
    name: "item"
}
