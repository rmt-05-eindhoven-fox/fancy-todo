const { Todo } = require('../models')

async function authorization(req, res, next) {
  try {
    const id = req.params.id
    console.log(id)
    const data = await Todo.findByPk(id)
    if (!data) {
      throw { msg: 'data not found', status: 404 }
    } else if (data.UserId === req.userLogedIn.id) {
      next()
    } else {
      throw { msg: 'not authorize', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization