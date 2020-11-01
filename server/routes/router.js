const router = require("express").Router()
const routertodos = require("./routertodos")
const ControllerUser = require("../controller/userController")
const authentication = require("../middlewares/authentication")
const QuoteController = require("../controller/quoteController")

router.post("/login", ControllerUser.login)
router.post("/register", ControllerUser.register)
router.post("/googleLogin", ControllerUser.googleLogin)

router.use(authentication)

router.use("/todos", routertodos)
router.get("/quote", QuoteController.getQuote)


module.exports = router