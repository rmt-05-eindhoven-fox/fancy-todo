const {User, Todo} = require('../database/models')

const getUserId = (discordUsername) => {
   return User.findOne({
      where: {
         username: discordUsername
      }
   })
}

const getAllTodos = (UserId) => {
   return Todo.findAll({
      where: {
         UserId,
         status: 'not done'
      }
   })
}
module.exports = {getUserId, getAllTodos}