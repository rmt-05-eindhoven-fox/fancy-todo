const bot = require('discord.js');

module.exports.run = async function(msg, args, client) {
   let botMsg = await msg.channel.send(`:ping_pong:`)

   botMsg.edit({ embed: {
      title: "📶 Pinging RemindMeBot",
      description: [
        "**Server**: `" + (botMsg.createdAt - msg.createdAt) + "ms`",
        "**API**: `" + Math.round(client.ping) + "ms`",
        "**Uptime**: `" + msToTime(client.uptime) + "`"
      ].join("\n"),
      footer: { text: "Requested by " + msg.author.tag, icon_url: msg.author.displayAvatarURL },
      timestamp: new Date()
    }}).catch(() => botMsg.edit("🆘 An unknown error occurred. "));
}

// module.exports = {
// 	name: 'ping',
// 	description: 'Ping!',
// 	execute(msg, args) {
//       let messageEmbed = new bot.MessageEmbed()
//          .setColor('#403b3b')
//          .setTitle('Reminder')
//          .setDescription(`You didn't provide any arguments, ${msg.author}!`)
//          .addFields(
//             { name: '`!done <argument>`', value: 'where argument is your Todo id.' },
//             { name: 'Run `!list`', value: 'to view your currently active Todo(s) then re-run the command again.' },
//          )
//       let ping = `${Date.now() - msg.createdTimestamp} ms`
//       msg.channel.send('Pong.');
//       msg.channel.send(`${ping}`)
// 	},
// };

// module.exports = {
// 	name: 'ping',
// 	description: 'Ping!',
// 	execute(msg, args) {
//       msg.channel.send('Pong.');
// 	},
// };