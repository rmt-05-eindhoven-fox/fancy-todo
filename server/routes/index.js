const router = require("express").Router()
const todoRouter = require("./Todos.js")
const userController = require("../controllers/userController.js")
const weatherController = require("../controllers/weatherController.js")

router.use('/todos', todoRouter)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.get('/weather', weatherController.weather)

module.exports = router