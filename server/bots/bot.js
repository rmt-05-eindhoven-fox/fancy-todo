require('dotenv').config()

const fs = require('fs');
const bot = require('discord.js')

// Import prefix config
const {prefix} = require('../bot_config.json')

// Bot initialization
const client = new bot.Client()
client.commands = new bot.Collection()

// Console log when the bot is running
client.on('ready', () => {
   console.log(`${client.user.tag} is now running`);
})

const commandFiles = fs.readdirSync('./bots/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
   const command = require(`../bots/commands/${file}`);
   client.commands.set(command.name, command)
}

client.on('message', (msg) => {
   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
   
   // Dynamically executing commands
   if (!client.commands.has(command)) return;

   try {
      client.commands.get(command).execute(msg, args);
   } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
   }
})

// Bot login using token
client.login(process.env.DISCORD_BOT_TOKEN)