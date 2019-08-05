module.exports.run = async (bot, message, args, con) => {
	let v = 2000;
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.").then(m => m.delete(v));
	
	let search = args.join(" ");
	if(!search) return message.channel.send("Please provide a valid ID or name.").then(m => m.delete(v));

	try {
		let bans = await message.guild.fetchBans();
		let banned = bans.get(search) || bans.find(u => u.tag.toLowerCase().includes(search.toLowerCase()));
		
		if(!banned) return message.channel.send("I could not find a banned user by this ID or name.").then(m => m.delete(v));

		await message.guild.unban(banned);

		message.channel.send(`${banned.tag} has been unbanned.`);
	} catch(e) {
		message.channel.send(`Unban failed: ${reason}`).then(m => m.delete(v));
	}
}

module.exports.help = {
	name: "unban"
}