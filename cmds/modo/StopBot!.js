module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.").then(m => m.delete(2000));
    
    message.reply("Extinction de l'humanité.....");
    console.log("Extinction de l'humanité.....");
    setInterval (function () {process.exit(0) }, 1 * 2000);
}

module.exports.help = {
	name: "StopBot!"
}