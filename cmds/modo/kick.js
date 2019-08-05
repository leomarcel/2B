module.exports.run = async (bot, message, args, con) => {
	let v = 2000;
	let reason = args.slice(1).join(" ");
	//let modRole = message.guild.roles.find("name", "Modo");
	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	//if(!message.member.roles.has(modRole.id)) return message.reply("Vous n'êtes pas autorisé à utiliser cette commande.").then(m => m.delete(v));;
	if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("Je n'est pas les permissions (KICK_MEMBER) pour faire ça.").then(m => m.delete(v));
	if(!target) return message.channel.send("Veuillez mentionner un utilisateur à kick :imp: ").then(m => m.delete(v));
	if(!target.kickable) return message.channel.send("Je ne peux kick cette utilisateur.").then(m => m.delete(v));

	try {
		await target.send(`You have been kicked from \`${message.guild.name}\`.\n**Reason:** ${reason || "No reason provided."}`);
	} catch(e) {
		message.channel.send("Attention: Impossible d'envoyer les informations du kick en DM à cet utilisateur.").then(m => m.delete(v));
	}
	
	target.kick().then(member => {
		message.reply(`${member.user.username} a été kick avec succès.`).catch(console.error);
		console.log(`${member.user.username} a été kick avec succès par ${message.author}.`);
		}).catch(console.error)
}

module.exports.help = {
	name: "kick"
}
