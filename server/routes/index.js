const router = require("express").Router()
const todoRouter = require("./Todos.js")
const userController = require("../controllers/userController.js")
const authentication = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use(authentication)
router.use('/todos', todoRouter)

module.exports = router