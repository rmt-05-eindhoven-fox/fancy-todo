const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', TodoController.showTodos)
router.post('/', TodoController.addTodo)

router.get('/:id', authorization, TodoController.getOneTodo)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router;