require('dotenv').config()

const {
   dailyReminder
} = require('../helper/bot')
// const {daily} = require('./commands/daily')

const fs = require('fs');
const bot = require('discord.js')
const cron = require('node-cron');
// const privateMsg = require('./commands/welcome')
// const welcomeMsg = require('./commands/dm')

// Import prefix config
const {
   prefix
} = require('../bot_config.json')

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
const channelId = "772939817834250263"

cron.schedule('0 7 * * *', function () {
   let channel = client.channels.cache.get(channelId)
   channel.send('@everyone')
   dailyReminder()
      .then(todos => {
         todos.forEach(todo => {
            if(todo.dataValues.Todos.length > 0) {
               let userMessage = new bot.MessageEmbed()
                  .setColor('#403b3b')
                  .setTitle(`This is an automatic daily reminder for @${todo.dataValues.username}`)
                  .setDescription(`A bot's gotta botting!`)
                  .setAuthor('RemindMeBot by 0x67', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd2wriHCNJBK_7BBKzlJc6wQtVxR92SSASHQ&usqp=CAU')
                  .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png')
                  .setTimestamp()
                  .setFooter(`You're amazing!`, 'https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png');
                  todo.dataValues.Todos.forEach(el => {
                     if(el.title !== '' || el.description !== '') {
                        userMessage.addField(`'${el.title}'`, `'${el.description}'`)
                     }
                  })
               channel.send(userMessage)
            }
         });
      })
      .catch(err => {
         console.log(err);
      })
});

// Bot login using token
client.login(process.env.DISCORD_BOT_TOKEN)