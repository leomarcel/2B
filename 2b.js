/////////////////////////////////////////////////////////////////////////
//To my futur self, don't try to understand it, I didn't either
//npm install -g nodemon / nodemon index.js
//////////////////////////////////////////////////////////////////kiradtn

const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var roller = require('roller');
var prefix = "-";
const mysql = require("mysql");
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");


connection.connect(err => {
	if(err) {
		console.log("Deconnected to database");
		throw err;
	} 
	console.log("Connected to database !");
});

function generateXP() { //algo evo xp
	let min = 0; let max = 5;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initial(){
	let init = 0;
	return init;
}

function generateCoins() { //algo evo coins
	let value = 0.05;
	return Math.floor(Math.random() + (value));
}

bot.on("message", async message => {
	connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur

		let sql;
        if(rows.length < 1) {
			sql = `INSERT INTO user (id, xp, coins) VALUES ('${message.author.id}', ${generateXP()}, ${initial()})`;
			connection.query(sql);
			return;
		}else {
			let xp = rows[0].xp;
			let coins = rows[0].coins;
			sql = `UPDATE user SET xp = '${xp + generateXP()}', coins = '${coins + generateCoins()}' WHERE id = '${message.author.id}'`
			connection.query(sql);
		}
	});
});

fs.readdir("2B/cmds/", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in cmds/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/modo", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("\nNo commands to load!");
		return;
	}
	console.log(`\nLoading ${jsfiles.length} commands in /modo/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/modo/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/help", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("\nNo commands to load!");
		return;
	}
	console.log(`\nLoading ${jsfiles.length} commands in /help/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/help/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/pay", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("\nNo commands to load!");
		return;
	}
	console.log(`\nLoading ${jsfiles.length} commands in /pay/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/pay/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/utils", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("\nNo commands to load!");
		return;
	}
	console.log(`\nLoading ${jsfiles.length} commands in /utils/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/utils/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/bar", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in /bar/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/bar/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("2B/cmds/inv", (err, files) => { //chargement fs js
	if(err) console.error(err);
	

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("\nNo commands to load!");
		return;
	}
	console.log(`\nLoading ${jsfiles.length} commands in /inv/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/inv/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", () => { //mute (json)
	bot.setInterval(() => {
		for(let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "Muted"); //var role
			if(!mutedRole) continue;

			if(Date.now() > time) {
				console.log(`${i} is now able to be unmuted!`);

				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
					if(err) throw err;
					console.log(`I have unmuted ${member.user.tag}.`);
				});
			}
		}
	}, 5000)
});

bot.on("message", async message => { //execution commande fs js
	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if(!command.startsWith(prefix)) return;
	
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args, connection, prefix);
});
/*
bot.on("message", async message => { //cmd sp
	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	//let command = message.content.split(" ")[0];
	let args = messageArray.slice(1);
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	//if(!command.startsWith(prefix)) return;

	if (message.content.startsWith("(")) {
		var timeout = 1;
        console.log("owo");
        let command = messageArray[0];
        //var timeout = 600;
        var timeout = 1;
            if(!command.content.startsWith("(")){
            return;
            }else {
                setTimeout(() => {
                    msg.deleted;
                    console.log("message supprimer au bout de " + timeout);
                }, timeout);
			}
			return;
	}
});
*/
function includesRealy(msg,str){
	return(
	  msg.content.includes(str) ||
	  msg.content.includes(str.toUpperCase()) ||
	  msg.content.includes(str.toLowerCase())
	)
}

bot.on("message", async message => { //Suppression HRP
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	/*
	if(message.content.startsWith("(")) {
		let timeout = 600000; //10 minutes
		//let timeout = 5000;
		setTimeout(function(){
			message.delete();
		}, timeout);
		return;
	}
	if(
		includesRealy(message,'viol') ||
		includesRealy(message,'nazi') ||
		includesRealy(message,'juif') ||
		includesRealy(message,'antisémite') ||
		includesRealy(message,'Viol') ||
		includesRealy(message,'Nazi') ||
		includesRealy(message,'Juif') ||
		includesRealy(message,'Antisémite')
	  ){
		message.delete();
		}
		*/
	return;
});

// bot.on("message", message =>{
// 	if ((message.content.startsWith("entrer sur le serveur")) || (message.content.startsWith("Entrer sur le serveur"))) {
// 		message.channel.send("Comment s'appelle l'un des deux dieux sur Origine ?");
// 		if (message.content.startsWith("Lussade") || (message.content.startsWith("Hylia")) || (message.content.startsWith("lussade")) || (message.content.startsWith("hylia"))){
// 			message.channel.send("Bienvenue");
// 			return;
// 		}else{
// 			message.channel.send("Go tout relire :grin:");
// 			return;
// 		}
// 		return;
//     }
// });

bot.on("guildMemberAdd", member => { //msg bienvenue + role
	let hey = "499169188355506177"; //Origins channel hey
	bot.channels.get(hey).send(`Hey ! Bienvenue sur les terres d'Origine ${member} :3 Lits tous les chans dans la catégorie **IMPORTANT**, et présente toi en une ou deux lignes pour savoir si tu es sérieux ou non :3 Par la suite, tu pourras avoir accès au serveur, faire ton personnage dans la race que tu veux, et.. commencer l'aventure !\n Pour acceder au reste du serveur, écrit "entrer sur le serveur" en dessous de ce message.`);
});

bot.on('warn', console.warn);
bot.on('error', console.error);
bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
bot.on('reconnecting', () => console.log('I am reconnecting now!'));
bot.on('ready', () => console.log(`${bot.user.tag} actif !`));

bot.login(TOKEN);
