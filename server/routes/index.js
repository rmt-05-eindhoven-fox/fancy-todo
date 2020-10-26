const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const UserController = require('../controllers/userController')

router.get('/todos', TodoController.getTodo)
router.post('/todos', TodoController.postTodo)
router.get('/todos/:id', TodoController.getTodoById)
router.put('/todos/:id', TodoController.updateTodo)
router.patch('/todos/:id', TodoController.statusTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)


module.exports = router