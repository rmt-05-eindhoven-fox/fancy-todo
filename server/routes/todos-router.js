const router = require('express').Router()
const Controller = require('../controllers/todos-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, Controller.todos)
router.post('/', authentication, Controller.postTodo)
router.get('/:id', authentication, authorization, Controller.findById)
router.put('/:id', authentication, authorization, Controller.putTodo)
router.patch('/:id', authentication, authorization, Controller.patchTodo)
router.delete('/:id', authentication, authorization, Controller.deleteTodo)

module.exports = router