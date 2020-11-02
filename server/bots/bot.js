require('dotenv').config()

const {daily} = require('./commands/daily')

const fs = require('fs');
const bot = require('discord.js')
const cron = require('node-cron');
// const privateMsg = require('./commands/welcome')
// const welcomeMsg = require('./commands/dm')

// Import prefix config
const {prefix} = require('../bot_config.json')

// Bot initialization
const client = new bot.Client()
client.commands = new bot.Collection()

// Console log when the bot is running
client.on('ready', () => {
   console.log(`${client.user.tag} is now running`);

   // privateMsg(client, 'test', 'Pong')
   // welcomeMsg(client)
})

// send a DM everytime a user join the server <<< masih error 
// const channelId = '770647381728952320'

// client.on('guildMemberAdd', member => {
//    console.log(member);
//    const message = `<${member.id} has joined the server!`

//    const channel = member.guild.channels.cache.get(channelId)
//    channel.send(message)
// })

// Command list
const commandFiles = fs.readdirSync('./bots/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
   const command = require(`../bots/commands/${file}`);
   client.commands.set(command.name, command)
}

client.on('message', (msg) => {
   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	let args = msg.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift().toLowerCase();
   
   // Dynamically executing commands
   if (!client.commands.has(command)) return;   
   
   try {
      client.commands.get(command).execute(msg, args, client);
   } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
   }
})

// send a reminder everyday at 7am
const channelId = "772878233439830066"
cron.schedule('* * * * *', function () {
   // let channel = client.channels.cache.get(channelId)
   // console.log(('cron daily jalan'));
   // channel.send("TEST")
   daily()
});

// Bot login using token
client.login(process.env.DISCORD_BOT_TOKEN)

/* NOTE
Jadi kak ternyata discord bot nggak bisa auto kirim welcomeMsg di luar scope server discordnya
Contoh:
pake command !help baru bisa welcomeMsg 
atau member join server nanti bisa auto welcomeMsg

jadi nanti untuk process connect to discordnya mau nggak mau user harus join dulu ke server nanti 
baru bisa saling DM sama botnya
*/