const { Todo } = require('../models')

function authorization(req, res, next) {
  const { id } = req.params
  Todo.findByPk(id)
  .then(data => {
    if (!data) {
      throw { msg: 'Task not found', status: 404}
    } else if (data.UserId === req.loggedInUser.id) {
      next()
    } else {
      throw { msg: 'Not authorized', status: 401}
    }
  }) 
  .catch(error => {
    // res.status(500).json(error)
    next(error)
  })
}

module.exports = authorization