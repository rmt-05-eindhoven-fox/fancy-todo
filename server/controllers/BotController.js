const {Todo} = require('../database/models')

// Aku masih bingung bang kalo pake controller sendiri gimana jadi aku lempar
// semua ke helper, mungkin nanti aku coba coba lagi
class BotController {
   static findAllTodos(id, msg) {
      return Todo.findOne({
         where: {
            id,
            status: 'not done'
         }
      })
   }
}

module.exports = BotController