const router = require('express').Router()
const TodoController = require('../../controller/todoController')
const authentication = require('../../middlewares/authentication')
const authorization = require('../../middlewares/authorization')

router.use(authentication)

router.get('/', TodoController.getTodo)
router.post('/', TodoController.postTodo)

router.get('/:id',authorization, TodoController.findIdTodo)
router.put('/:id',authorization, TodoController.putTodo)
router.patch('/:id',authorization, TodoController.patchTodo)
router.delete('/:id',authorization, TodoController.deleteTodo)


/**
 * autentikasi -> izin bisa punya akses atau engga
 * autorisasi -> Akses buat crud
 */

module.exports = router