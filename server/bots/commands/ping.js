const bot = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args, client) {
      let messageEmbed = new bot.MessageEmbed()
         .setColor('#403b3b')
         .setTitle(':ping_pong:  RemindMeBot said: "Pong!"')
         .setDescription(`Requested by ${msg.author}`)
         .addFields(
            { name: '**Server**', value: `${Date.now() - msg.createdTimestamp} ms` },
            { name: '**Bot Uptime**', value: `${msToTime(client.uptime)}` },
         )
         .setTimestamp()
         .setFooter(`You're amazing!`, 'https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png');
      msg.channel.send(messageEmbed)
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