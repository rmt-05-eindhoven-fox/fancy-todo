const router = require('express').Router();
const Controller = require('../controllers/TodoController')

router.post('/todos', Controller.create)
router.get('/todos', Controller.showTodos)

router.get('/todos/:id', Controller.showTodo)



module.exports = router