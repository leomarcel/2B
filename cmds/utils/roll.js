var Discord = require("discord.js");
var fs = require('fs');
const { RichEmbed } = require("discord.js");
var roller = require('roller');

module.exports.run = async (bot, message, args) => {
  var match_data = message.content.match(/^\*roll ([1-9][0-9]*)d([1-9][0-9]*)/);

  if(match_data) {
    var n_dice = parseInt(match_data[1], 10);
    var n_sides = parseInt(match_data[2], 10);

    if(n_dice > 10000) {
      message;channel.send("Malheureusement pour toi, les ordinateurs ont une quantité de mémoire limitée. Par conséquent, si vous ne voulez pas que je ne me stop, arrêtes d’envoyer des chiffres ridicules. Merci.");
      return;
    }

    console.log("rolling " + n_dice + "d" + n_sides);
    var dice = roller.roll(n_dice, n_sides);

    var message_content = "";
    var sum;

    if(n_dice > 1) {
      sum = dice.reduce(function(prev, curr) {
        return prev + curr;
      });

      message_content = "**Rolls :** " + dice.join(", ") +"\n**Sum :** " +  sum;
    } else {
      message_content = dice[0];
    }

    if(message_content.length > 2000) {
      message.channel.send("La longueur de la réponse dépasse la limite de longueur de message de Discord (2000). Cependant, la resultat était" + sum);
      return;
    }

    //return message.reply(message_content);
    return message.channel.send(new RichEmbed().setDescription("**Dés ! :game_die:**\n\n" + message.author + " **Dice rolled :** " + n_dice + "\n" + "**The sum of the dice is : **" + message_content ).setColor(1752220));
  }else{
    return message.channel.send(new RichEmbed().setDescription("**Dés ! :game_die:**\n\n" + 
    "**Syntax :** *roll ``x``d``y`` où ``x`` est le nombre de dés à lancer et ``y`` le nombre de faces de dés.\n" +
    "**Exemple :** *roll ``2``d``20``"
    ).setColor(1752220));
  }
}

module.exports.help = {
	name: "roll"
}