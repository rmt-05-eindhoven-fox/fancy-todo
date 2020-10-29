const router = require('express').Router()
const todoRouter = require('./todoRouter') 
const movieRouter = require('./movieRouter')

const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todoRouter)
router.use('/movies', movieRouter)

module.exports = router