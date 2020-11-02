const bot = require('discord.js');
const {markDone} = require('../../helper/bot')

module.exports = {
	name: 'mark',
	description: 'Mark todo as done',
	execute(msg, args) {
      let messageEmbed = new bot.MessageEmbed()
         .setColor('#403b3b')
         .setTitle('Reminder')
         .setDescription(`You didn't provide any arguments, ${msg.author}!`)
         .addFields(
            { name: '`!mark <argument>`', value: 'where argument is your Todo id.' },
            { name: 'Run `!list`', value: 'to view your currently active Todo(s) then re-run the command again.' },
         )
      if (!args.length) {
         msg.channel.send(messageEmbed)
      }
      // only get the first argument
      else if(args[0]) {
         const id = +args[0]
         msg.channel.send(`Marking Todo with id: ${id} as **Done**`)
         markDone(id)
            .then(res => {
               msg.channel.send(`Congrats! Todo ${id} successfully marked as **Done**`)
            })
      }
	},
};