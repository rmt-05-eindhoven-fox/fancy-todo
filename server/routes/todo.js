const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, TodoController.getTodo)
router.post('/', authentication, TodoController.postTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.statusTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router