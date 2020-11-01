const bot = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Help',
	execute(msg, args) {
      let messageEmbed = new bot.MessageEmbed()
         .setColor('#403b3b')
         .setTitle('Need some help?')
         .setURL('https://discord.js.org/') 
         .setAuthor('RemindMeBot by 0x67', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd2wriHCNJBK_7BBKzlJc6wQtVxR92SSASHQ&usqp=CAU')
         .setDescription('You can do `!<command>` to run a command, or `!help` to view all available commands.')
         .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png')
         .addFields(
            { name: 'list', value: 'View all your not completed Todos.' },
            { name: 'done', value: 'Mark your Todo as done' },
            { name: 'create', value: '[title] [description] [due_date]'}, 
            { name: 'remindMe', value: 'Automatically remind you 1 day before your Todo deadline. Currently in development.' },

         )
         .setTimestamp()
         .setFooter(`You're amazing`, 'https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png');
		msg.channel.send(messageEmbed);
	},
};