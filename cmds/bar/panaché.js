const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
    let prix = 10;
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(message.author + " Mentionner quelqu'un à qui acheter une Panaché| `!Panaché<user>` :beer:");
    
    if (target == message.author) {
        connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) return console.log(err); //arrête le programme en cas d'erreur
            let user_coins = rows[0].xp;
            connection.query(`UPDATE user SET xp = ${user_coins - prix} WHERE id = '${message.author.id}'`);
        });
        message.channel.send(new RichEmbed().setDescription("**Panaché! :beer:**\n" + message.author + " s'est acheter pour **" + prix + " xp** une Panaché! :beer:").setColor(1752220));
    } else {
        connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) return console.log(err); //arrête le programme en cas d'erreur
            let users_coins = rows[0].xp;
            connection.query(`UPDATE user SET xp = ${users_coins - prix} WHERE id = '${message.author.id}'`);
        });
        message.channel.send(new RichEmbed().setDescription("**Panaché! :beer:**\n" + message.author + " a acheter pour **" + prix + " xp** à " + target + " une Panaché! :beers:").setColor(1752220));
    }
}

module.exports.help = {
	name: "panache"
}