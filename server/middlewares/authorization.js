const { Todo } = require('../models/index')

function authorization (req, res, next) {
    let { id } = req.params
    Todo.findByPk(id)

    .then(todo => {
      if(!todo) throw {
        message:'Error not found', statusCode:404
      }
  
      if(todo.UserId !== req.userData.id) throw {
        msg: 'Authorization Failed!'
      }
      next()
    }) .catch(err => {
    next(err)
  })
}

module.exports = authorization