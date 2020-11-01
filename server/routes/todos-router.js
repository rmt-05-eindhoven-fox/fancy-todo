const router = require('express').Router()
const Controller = require('../controllers/todos-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', Controller.todos)
router.post('/', Controller.postTodo)
router.get('/:id', authorization, Controller.findById)
router.put('/:id', authorization, Controller.putTodo)
router.patch('/:id', authorization, Controller.patchTodo)
router.delete('/:id', authorization, Controller.deleteTodo)

module.exports = router