const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/', TodoController.createTodo)

router.get('/', TodoController.getAllTodos)

router.get('/:id', TodoController.getTodo)

router.put('/:id', TodoController.updateTodo)

router.patch('/:id', TodoController.patchTodo)

router.delete('/:id', TodoController.deleteTodo)

module.exports = router