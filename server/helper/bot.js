const {
   User,
   Todo
} = require('../database/models')

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

const markDone = (todoId) => {
   const id = todoId

   const editedStatus = {
      status: 'done'
   }

   return Todo.update(editedStatus, {
      where: {
         id: id
      },
      returning: true
   })
}

const createTodo = (newTodo) => {
   return Todo.create(newTodo)
}
module.exports = {
   getUserId,
   getAllTodos,
   markDone,
   createTodo
}