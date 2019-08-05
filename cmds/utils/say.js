const { RichEmbed } = require("discord.js");

module.exports.run = (bot, message, args, con) => {
	//if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.");
	//let str = args.join(" ");
	let str = args.join(" ");
	if(!str) return message.channel.send("Please supply some content.");
	/*
	message.channel.send(new RichEmbed().setDescription(str).setColor("#daa520"));
	*/
	message.delete();
	message.channel.send(str);
}

module.exports.help = {
	name: "say"
}