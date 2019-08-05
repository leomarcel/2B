const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.").then(m => m.delete(1000));

	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You did not specify a user mention or ID!").then(m => m.delete(1000));

	let role = message.guild.roles.find(r => r.name === "Muted");

	if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!").then(m => m.delete(1000));

	await toMute.removeRole(role);

	delete bot.mutes[toMute.id];

	fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
		if(err) throw err;
		console.log(`I have unmuted ${toMute.user.tag}.`);
		message.channel.send("I have muted this user!");
	});
}

module.exports.help = {
	name: "unmute"
}