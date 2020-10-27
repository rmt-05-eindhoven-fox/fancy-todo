const router = require('express').Router()
const UserController = require('../controllers/user')
const ToDoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/todos', authentication, ToDoController.add)
router.get('/todos', authentication, ToDoController.findAll)
router.get('/todos/:id', authentication, ToDoController.findOne)
router.put('/todos/:id', authentication, ToDoController.edit)
router.patch('/todos/:id', authentication, ToDoController.editStatus)
router.delete('/todos/:id', authentication, ToDoController.deleted)

module.exports = router