const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', TodoController.showTodos)
router.post('/', TodoController.addTodo)

router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.patchTodo)

router.get('/:id', authorization, TodoController.getOneTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router;