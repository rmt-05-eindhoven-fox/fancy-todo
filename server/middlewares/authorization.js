const { Todo } = require('../models')

module.exports = (req, res, next) => {
  let todoId = req.params.id
  let { id } = req.login
  console.log(todoId);
  Todo.findByPk(todoId)
    .then(data => {
      console.log(data)
      if(!data) res.status(404).json({ error: 'Todo not found'})
      else if(data.userFK === id) next()
      else res.status(401).json({ error: 'You are not authorized'})
    })
}