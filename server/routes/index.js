const router = require("express").Router()
const todoRouter = require("./Todos.js")
const userController = require("../controllers/userController.js")

router.use('/todos', todoRouter)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router