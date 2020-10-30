const router = require('express').Router();
const UserController = require('../controllers/UserController');
const TodoRouter = require('./todos')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/user-authorization')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/check/:email', authentication, authorization, UserController.getUserInfo)

router.put('/check/:id', authentication, UserController.editUserInfo)

router.use('/todos', TodoRouter)

module.exports = router