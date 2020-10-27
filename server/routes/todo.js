const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.getTodo)
router.post('/', TodoController.postTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.statusTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router