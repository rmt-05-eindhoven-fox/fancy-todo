const bot = require('discord.js');
const {getUserId, createTodo} = require('../../helper/bot')

module.exports = {
	name: 'create',
	description: 'Create a new todo',
	execute(msg, args) {
      const username = msg.author.tag
      // TODO: Better regex for create todo from discord
      args = msg.content.slice(1).trim().split(/\[(.*?)\]/)

      let noArgsMsg = new bot.MessageEmbed()
         .setColor('#403b3b')
         .setTitle('Reminder')
         .setDescription(`You didn't provide any arguments, ${msg.author}!`)
         .addFields(
            { name: '`!create [title] [description] [due_date]`', value: 'Details for each arguments are explained below' },
            { name: ' [title] ', value: 'Your Todo title' },
            { name: ' [description] ', value: 'Your Todo description' },
            { name: ' [due_date] ', value: 'Your Todo due date, format: YYYY-MM-DD' },
            { name: ' **REMAINDER** ', value: 'Use square brackets `[value here]` for each arguments' },
         )
      if (args.length === 1) {
         msg.channel.send(noArgsMsg)
      }
      else {
         getUserId(username)
            .then(res => {
               const newTodo = {
                  title: `${args[1]}`,
                  description: args[3],
                  status: 'not done', // default
                  due_date: args[5],
                  UserId: res.id
               }

               return createTodo(newTodo)
                  .then(done => {
                     let successMessage = new bot.MessageEmbed()
                        .setColor('#403b3b')
                        .setTitle('Successfully created Todo with following details')
                        .addFields(
                           { name: ' [title] ', value: `${newTodo.title}` },
                           { name: ' [description] ', value: `${newTodo.description}` },
                           { name: ' [status] ', value: `${newTodo.status}` },
                           { name: ' [due_date] ', value: `${newTodo.due_date}` },
                        )
                        msg.channel.send(successMessage)
                     // msg.channel.send('Todo successfuly created. Type `!list` to view your recently created Todo')
                  })
                  .catch(err => {
                     msg.channel.send(`${err}`)
                  })
            }) 
      }
	},
};