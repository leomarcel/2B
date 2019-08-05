const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	let args1 = message.content.split(" ").slice(1);
    let thingToEcho = args1.join(" ");
    if (!thingToEcho) return message.channel.send("Merci d'écrire un sondage.").then(m => m.delete(4000));
    let embed = new Discord.RichEmbed()
        .setDescription("Sondage")
        .addField(thingToEcho, "répondre avec :white_check_mark: ou :x:")
        .setColor("0xB40404")
        .setTimestamp()

    message.channel.send(embed)
    .then(function (message) {
        message.react("❌")
        message.react("✅")
    });

}

module.exports.help = {
	name: "sondage"
}