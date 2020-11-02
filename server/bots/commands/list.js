// Import helper to find UserId from Discord Username
const {getUserId, getAllTodos} = require('../../helper/bot')
const bot = require('discord.js');

module.exports = {
	name: 'list',
	description: 'Ping!',
	execute(msg, args) {
      const username = msg.author.tag
      const emoji = `:partying_face: :partying_face: :partying_face: `

      let messageTemplate = `Showing your latest 5 Todo(s) \n\n`
      getUserId(username)
         .then(res => {
            return getAllTodos(res.id)
               .then(todos => {
                  if(!todos.length) {
                     msg.channel.send(`${emoji} Yay no todo`)
                  }
                  else {
                     todos.forEach(el => {
                        messageTemplate += `**Todo ID**: ${el.dataValues.id}\n**Title**: ${el.dataValues.title}\n**Description**: ${el.dataValues.description}\n**Status**: ${el.dataValues.status}\n**Deadline**: ${formatDate(el.dataValues.due_date)}\n\n`
                     });
   
                     msg.reply(`${messageTemplate}\n**P.S.** Discord only support maximum of 2000 characters each message.`)
                  }
               })
         })
         .catch(err => {
            let messageEmbed = new bot.MessageEmbed()
               .setColor('#403b3b')
               .setTitle('Register your Discord Username')
               .setURL('https://fancy-todo-12af6.web.app/') 
               .setDescription(`Ooops! It seems that username ${msg.author} is not associated with any account.\nPlease integrate your account with our Discord Bot by using the link above.`)
               .setTimestamp()
               .setFooter(`You're amazing!`, 'https://cdn.iconscout.com/icon/free/png-256/reminder-19-461743.png');
            msg.channel.send(messageEmbed);
            // msg.channel.send('Error executing that command')
         })
	},
};

formatDate = (date) => {
   var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2)
      month = '0' + month;
   if (day.length < 2)
      day = '0' + day;

   return [year, month, day].join('-');
}