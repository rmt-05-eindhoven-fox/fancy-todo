const router = require('express').Router()
const todoRouter = require('./todoRouter') 
const movieRouter = require('./movieRouter')
const authentication = require('../middlewares/authentication')

const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)
router.use('/todos', todoRouter)
router.use('/movies', movieRouter)

module.exports = router