const router = require("express").Router()
const todoRouter = require("./Todos.js")
const userController = require("../controllers/userController.js")

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/todos', todoRouter)

module.exports = router