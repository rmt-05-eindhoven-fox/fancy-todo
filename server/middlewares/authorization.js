const { Todo } = require('../models')

module.exports = (req, res, next) => {
  let todoId = req.params.id
  let { id } = req.login
  console.log(todoId);
  Todo.findByPk(todoId)
    .then(data => {
      console.log(data)
      if(!data) next({ msg: 'Todo not found', status: 404})
      else if(data.userFK === id) next()
      else next({ msg: 'You are forbidden to do this', status: 401})
    })
}