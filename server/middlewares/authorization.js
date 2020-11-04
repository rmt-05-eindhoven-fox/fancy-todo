const {Todo} = require('../database/models')

authorization = async (req, res, next) => {
   const {id} = req.params

   try {
      const todo = await Todo.findByPk(id)
      
      if(!todo) {
         throw {
            msg: "Todo not found",
            status: 404
         }
      } else if(todo.UserId === req.loggedInUser.id) {
         next()
      } else {
         throw {
            msg: 'Not authorized',
            status: 401
         }
      }
   } catch (err) {
      const status = err.status || 500
      const msg = err.msg || 'Internal Server Error'

      res.status(status).json({
         err: msg
      })
   }
}

module.exports = authorization