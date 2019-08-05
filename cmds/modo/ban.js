module.exports.run = async (bot, message, args) => {
	let v = 2000;
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.").then(m => m.delete(v));
	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.channel.send("Please provide a valid mention or ID.").then(m => m.delete(v));

	if(!target.bannable) return message.channel.send("I cannot ban this user.").then(m => m.delete(v));

	let time = parseInt(args[1]);
	let reason = args.slice(time ? 2 : 1).join(" ");

	try {
		await target.send(`You have been banned from \`${message.guild.name}\`.\n**Reason:** ${reason || "No reason provided."}`);
	} catch(e) {
		message.channel.send("Warning: Could not send this user a DM informing them of their ban. They likely have messages turned off.").then(m => m.delete(v));
	}

	try {
		await target.ban({reason});
		message.channel.send("User banned.");
	} catch(e) {
		message.channel.send(`Ban failed: ${e.message}`).then(m => m.delete(v));
	}
}

module.exports.help = {
	name: "ban"
}