const router = require("express").Router()
const todoRouter = require("./todo.Router")
const userRouter = require("./user.Router")
const quoteRouter = require("./quote.Router") 
const authentication = require("../middleware/authentication.middleware")

router.use("/users", userRouter)
router.use(authentication)
router.use("/todos",todoRouter)
router.use("/quetos", quoteRouter)

module.exports = router