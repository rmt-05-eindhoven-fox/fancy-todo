// Import helper to find UserId from Discord Username
const {getUserId, getAllTodos} = require('../../helper/bot')

module.exports = {
	name: 'list',
	description: 'Ping!',
	execute(msg, args) {
      const username = msg.author.tag
      const emoji = `:partying_face: :partying_face: :partying_face: `

      let messageTemplate = `Your current todo(s) are \n\n`
      getUserId(username)
         .then(res => {
            return getAllTodos(res.id)
               .then(todos => {
                  if(!todos.length) {
                     msg.channel.send(`${emoji} Yay no todo`)
                  }
                  else {
                     todos.forEach(el => {
                        messageTemplate += `**Todo ID**: ${el.dataValues.id}\n**Title**: ${el.dataValues.title}\n**Description**: ${el.dataValues.description}\n**Status**: ${el.dataValues.status}\n**Deadline**: ${el.dataValues.due_date}\n\n`
                     });
   
                     msg.reply(`${messageTemplate}`)
                  }
               })
         })
         .catch(err => {
            console.log(err);
         })
	},
};