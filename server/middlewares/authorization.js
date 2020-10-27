const { Todo } = require('../models')

async function authorization(req, res, next) {
  const userId = req.userLoggedIn.id 
  const todoId = +req.params.id
  // mau klarifikasi, apakah --> todoId.userId === userId
  // kemungkinan (input params salah), (post tidak ditemukan), (userId tidak cocok)
  try {
    if (isNaN(todoId)) {
      throw { msg: 'todo ID is not valid', status: 400}
    } else {
      const todo = await Todo.findByPk(todoId)
      if (!todo) {
        throw { msg: 'todo not found', status: 404}
      } if (todo.userId === userId) {
        next()
      } else {
        throw { msg: 'not authorized', status: 401}
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization