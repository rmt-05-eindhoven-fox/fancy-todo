module.exports = client => {
   const channelId = '770647381728952320'

   client.on('guildMemberAdd', member => {
      console.log(member);
      const message = `<${member.id} has joined the server!`

      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
   })
}