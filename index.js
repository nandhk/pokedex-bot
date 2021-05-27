const Discord = require('discord.js');
const bot = new Discord.Client
const fs = require('fs');
const util = require('util');
const config = require('./config.json')

bot.on('ready', ready => {
  console.log(`logged in`)
})


const Pokedex = require('./pokedexhelper.js');
const convert = require('convert-units');



const formatHeight = (height) => {
    const meters = height / 10;
    const feet = convert(meters).from('m').to('ft-us');
    const parts = feet.toString().split('.');
    const characteristic = parts[0];
    const mantissa = `.${parts[1]}`;
    const inches = convert(mantissa).from('ft').to('in').toFixed();
    return `${characteristic}' ${inches}"`
}

const formatWeight = (weight) => {
    const grams = weight * 100;
    const lb = convert(grams).from('g').to('lb').toFixed(1);
    return `${lb} lbs`;
}

const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

bot.on('message', async message => {
	const POKEDEX_CMD = '$pokedex';
  if(message.content.startsWith(POKEDEX_CMD))
            var array = message.content.split(' ');
            array.shift()
         let Pokemon = array.join(' ');
            if (Pokemon) {
				try {
					const result = await Pokedex.search(Pokemon)
					const DexEmbed = new Discord.MessageEmbed()
					 .setAuthor(`${Pokemon}`, result.sprites.front_shiny)
					 .setTitle(formatName(result.name))
					 .setThumbnail(result.sprites.front_default)
           .setDescription(`**No. ${result.id}** \n **Type - ${result.types[0].type.name}**`)
					 .addField("Weight", formatWeight(result.weight))
					 .addField("Height", formatHeight(result.height))
					 .setColor("GREEN")
					 .addField("Description",  result.description)
           .setFooter(`Requested By ${message.author.username}`,message.author.avatarURL())
           .setTimestamp();
				message.channel.send(DexEmbed);
				} catch(err) {
					console.log(err);
					message.channel.send('NO DATA')
				}
            } else {
                message.channel.send(`You didn\'t provide which pokemon to search for <@!${message.author.id}>`);
            }
});

bot.login(config.Token)
