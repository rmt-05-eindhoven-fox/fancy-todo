const { Todo } = require('../models')

module.exports = (req, res, next) => {
  let todoId = req.params.id
  let { id } = req.login
  Todo.findByPk(todoId)
    .then(data => {
      console.log(data)
      if(!data) throw { msg: 'Todo not found', status: 404}
      else if(data.userFK === id) next()
      else throw { msg: 'You are forbidden to do this', status: 401}
    })
    .catch(err => {
      next(err)
    })
}