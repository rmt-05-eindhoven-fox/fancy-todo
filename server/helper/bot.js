const {
   User,
   Todo
} = require('../database/models')
const Op = require('sequelize').Op;

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
      },
      limit: 5, // discord chat maximum of 2000 characters
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

// const sleep = ms => {
//    return new Promise(resolve => setTimeout(resolve, ms))
// }

// getEveryUsername = async () => {
//    try {
//       const users = await User.findAll({
//          where: {
//             username: {
//                [Op.ne]: null
//             }
//          },
//          include: {
//             model: Todo,
//             where: {
//                status: 'not done'
//             }
//          }
//       })
      
//       users.forEach(user => {
//          // console.log(user.dataValues);
//          user.dataValues.Todos.forEach(todo => {
//             console.log(todo.dataValues);
//          })
//       });
//    } catch (err) {
//       console.log(err);
//    }
// }

// DAILY REMINDER
const dailyReminder = () => {
   return User.findAll({
      where: {
         username: {
            [Op.ne]: null
         }
      },
      include: {
         model: Todo,
         where: {
            status: 'not done'
         },
         limit: 5
      }
   })
}

// console.log(dailyReminder().then(res => {
//    console.log(res);
// }));

module.exports = {
   getUserId,
   getAllTodos,
   markDone,
   createTodo,
   dailyReminder
}