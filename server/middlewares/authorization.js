const { Todo } = require('../models/index')

const authorization = async(req, res, next) => {
  try{
    let { id } = req.params
    const todo = await Todo.findByPk(id)

    if(!todo) throw {
      message:'Error not found', statusCode:404
    }

    if(todo.UserId !== req.userData.id) throw {
      msg: 'Authorization Failed!'
    }
    next()
  } catch(err) {
    next(err)
  }
}

module.exports = authorization