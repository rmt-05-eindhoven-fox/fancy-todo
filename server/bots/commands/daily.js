const {dailyReminder} = require('../../helper/bot')
const bot = require('discord.js');
const client = new bot.Client()

daily = () => {
   client.on('message', (message) => {})
   const channelId = "772878233439830066"
   let channel = client.channels.cache.get(channelId)

   channel.send('HELLO INI DI IMPORT')
}

module.exports = daily