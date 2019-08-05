/*
:beer: = 40
:tumbler_glass: = 20 xp
:wine_glass: = 35 xp
:cocktail: = 28

*/
const { RichEmbed } = require("discord.js");
const PREFIX = "*";

module.exports.run = async (bot, message, args, connection) => {
	message.channel.send( {
		embed: {
			color: 1752220,
			description: "\n**:beers: Bar**\n" +
				"\n" +
				PREFIX + ":beer: `bière`= 40 xp\n" +
				PREFIX + ":tumbler_glass: `hydromel`= 16 xp\n" +
				PREFIX + ":cocktail: `bloody-mary (Bloody Mary)`= 28 xp\n" +
				PREFIX + ":wine_glass: `bordeau` = 28 xp\n" +
				PREFIX + ":tumbler_glass: `bourbon`= 20 xp\n" +
				PREFIX + ":wine_glass: `brandy` = 35 xp\n" +
				PREFIX + ":coffee: `café`= 10 xp\n" +
				PREFIX + ":tumbler_glass: `Calva`= 20 xp\n" +
				PREFIX + ":champagne: `champagne` = 35 xp\n" +
				PREFIX + ":tumbler_glass: `cidre-brut`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `cidre-doux`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `cidre`= 20 xp\n" +
				PREFIX + ":cocktail: `cocktail`= 28 xp\n" +
				PREFIX + ":milk: `eau` = gratuit\n" +
				PREFIX + ":tumbler_glass: `gin`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `hydromel`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `j&b`= 20 xp\n" +
				PREFIX + ":tropical_drink: `jus-de-fruit`= 5 xp\n" +
				PREFIX + ":milk: `lait`= 5 xp\n" +
				PREFIX + ":tumbler_glass: `licorne`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `martinique`= 20 xp\n" +
				PREFIX + ":tropical_drink: `mojito`= 25 xp\n" +
				PREFIX + ":tumbler_glass: `mortsubite`= 16 xp\n" +
				PREFIX + ":tumbler_glass: `panache`= 10 xp\n" +
				PREFIX + ":tumbler_glass: `pastis`= 20 xp\n" +
				PREFIX + ":cocktail: `perroquet`= 28 xp\n" +
				PREFIX + ":wine_glass: `porto` = 25 xp\n" +
				PREFIX + ":tumbler_glass: `rhum`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `ricard`= 40 xp\n" +
				PREFIX + ":sake: `sake`= 60 xp\n" +
				PREFIX + ":tumbler_glass: `scotch`= 20 xp\n" +
				PREFIX + ":tumbler_glass: `sexonthebeach`= 30 xp\n" +
				PREFIX + ":milk::strawberry: `sirop` = 10 xp\n" +
				PREFIX + ":tumbler_glass: `tequila`= 30 xp\n" +
				PREFIX + ":tea: `thé`= 12 xp\n" +
				PREFIX + ":wine_glass: `vin-rouge` = 29 xp\n" +
				PREFIX + ":wine_glass: `vin-blanc` = 29 xp\n" +
				PREFIX + ":wine_glass: `vin` = 25 xp\n" +
				PREFIX + ":tumbler_glass: `vodka` = 25 xp\n" +
				PREFIX + ":tumbler_glass: `whisky` = 25 xp\n" +
				
				PREFIX + ":milk:`eau` = gratuit\n" +
				"\n**Exemple : " + PREFIX + "bière @user**\n" +
				"\n ps : L'alcool est dangereux pour la santé, à consommer avec modération ~~ou pas~~ !!\n" +
				"\n Si vous souhaiter avoir de nouvelle boisson, dites le à un modo** !!\n"
		}
	});
}
module.exports.help = {
	name: "bar"
}