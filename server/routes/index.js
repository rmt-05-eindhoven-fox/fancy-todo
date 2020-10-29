const router = require('express').Router()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

router.post('/todos', Controller.todoAdd)

router.get('/todos', Controller.todoList)


router.get('/todos/:id', authorization, Controller.todoId)

router.put('/todos/:id', authorization, Controller.todoPut)

router.patch('/todos/:id', authorization, Controller.todoPatch)

router.delete('/todos/:id', authorization, Controller.delete)

module.exports = router