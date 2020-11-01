const router = require('express').Router()
const todosRouter = require('./todos-router')
const UsersController = require('../controllers/users-controller')

router.post('/register', UsersController.postRegister)
router.post('/login', UsersController.postLogin)
router.post('/googleLogin', UsersController.googleLogin)
router.use('/todos', todosRouter)

module.exports = router