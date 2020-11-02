const bot = require('discord.js');

// module.exports.run = async function(msg, args, client) {
//    let botMsg = await msg.channel.send(`:ping_pong:`)

//    botMsg.edit({ embed: {
//       title: "📶 Pinging RemindMeBot",
//       description: [
//         "**Server**: `" + (botMsg.createdAt - msg.createdAt) + "ms`",
//         "**API**: `" + Math.round(client.ping) + "ms`",
//         "**Uptime**: `" + msToTime(client.uptime) + "`"
//       ].join("\n"),
//       footer: { text: "Requested by " + msg.author.tag, icon_url: msg.author.displayAvatarURL },
//       timestamp: new Date()
//     }}).catch(() => botMsg.edit("🆘 An unknown error occurred. "));
// }

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args, client) {
      let messageEmbed = new bot.MessageEmbed()
         .setColor('#403b3b')
         .setTitle(':ping_pong: Pinging RemindMeBot')
         .addFields(
            { name: '**Server**', value: `${Date.now() - msg.createdTimestamp} ms` },
            { name: '**API**', value: `${Math.round(client.ping)}` },
            { name: '**Uptime**', value: `${msToTime(client.uptime)}` },
         )
         .setTimestamp()
         .setFooter(`Requested by ${msg.author}`, 'https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png');
      // let ping = `${Date.now() - msg.createdTimestamp} ms`
      // msg.channel.send('Pong.');
      msg.channel.send(`${messageEmbed}`)

      console.log(messageEmbed);
	}, 
};

function msToTime(ms){
   days = Math.floor(ms / 86400000); // 24*60*60*1000
   daysms = ms % 86400000; // 24*60*60*1000
   hours = Math.floor(daysms / 3600000); // 60*60*1000
   hoursms = ms % 3600000; // 60*60*1000
   minutes = Math.floor(hoursms / 60000); // 60*1000
   minutesms = ms % 60000; // 60*1000
   sec = Math.floor(minutesms / 1000);
 
   let str = "";
   if (days) str = str + days + "d";
   if (hours) str = str + hours + "h";
   if (minutes) str = str + minutes + "m";
   if (sec) str = str + sec + "s";
 
   return str;
 }
// module.exports = {
// 	name: 'ping',
// 	description: 'Ping!',
// 	execute(msg, args) {
//       msg.channel.send('Pong.');
// 	},
// };