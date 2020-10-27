// Import helper to find UserId from Discord Username
const {getUserId, getAllTodos} = require('../../helper/bot')

module.exports = {
	name: 'list',
	description: 'Ping!',
	execute(msg, args) {
      const username = msg.author.tag

      let messageTemplate = `Your current todo(s) are \n\n`

      getUserId(username)
         .then(res => {
            return getAllTodos(res.id)
               .then(todos => {
                  todos.forEach(el => {
                     messageTemplate += `**Title**: ${el.dataValues.title}\n**Description**: ${el.dataValues.description}\n**Status**: ${el.dataValues.status}\n**Deadline**: ${el.dataValues.due_date}\n\n`
                  });

                  msg.reply(`${messageTemplate}`)
               })
         })
         .catch(err => {
            console.log(err);
         })
	},
};