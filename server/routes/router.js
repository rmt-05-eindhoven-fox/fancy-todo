const router = require("express").Router()
const routertodos = require("./routertodos")
const ControllerUser = require("../controller/userController")
const authentication = require("../middlewares/authentication")

router.post("/login", ControllerUser.login)
router.post("/register", ControllerUser.register)

router.use(authentication)

router.use("/todos", routertodos)


module.exports = router