module.exports = {
	name: 'help',
	description: 'Help',
	execute(msg, args) {
      let messageTemplate = [
         `**Need some help?**\n`,
         'You can do `!<command>` to run a command, or `!help` to list every available command.\n',
      ]
		msg.channel.send(`${messageTemplate.join('')}`);
	},
};