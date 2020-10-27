const TodoController = require('../controllers/todoController')
const ToDoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = require('express').Router()

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.get('/:id', authorization, TodoController.findId)
router.put('/:id', authorization, TodoController.update)
router.patch('/:id', authorization, TodoController.status)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router
