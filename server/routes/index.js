const router = require("express").Router()
const todoRouter = require("./todo.Router")
const userRouter = require("./user.Router")
const authentication = require("../middleware/authentication.middleware")

router.use("/users", userRouter)
router.use(authentication)
router.use("/todos",todoRouter)

module.exports = router