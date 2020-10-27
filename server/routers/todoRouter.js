const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/todos', TodoController.showTodos)
router.post('/todos', TodoController.addTodo)

router.put('/todos/:id', TodoController.updateTodo)
router.patch('/todos/:id', TodoController.patchTodo)

router.get('/todos/:id', authorization, TodoController.getOneTodo)
router.delete('/todos/:id', authorization, TodoController.deleteTodo)

module.exports = router;