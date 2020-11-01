const router = require('express').Router()
const UserController = require('../controllers/user')
const ToDoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const favRoute = require('../controllers/favQ')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/favQ', favRoute.show)

router.use(authentication)
router.post('/todos', ToDoController.add)
router.get('/todos', ToDoController.findAll)

router.get('/todos/:id', authorization, ToDoController.findOne)
router.put('/todos/:id', authorization, ToDoController.edit)
router.patch('/todos/:id', authorization, ToDoController.editStatus)
router.delete('/todos/:id', authorization, ToDoController.deleted)

module.exports = router