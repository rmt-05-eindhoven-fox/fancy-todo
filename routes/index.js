const router = require("express").Router()

const TodoController = require("../controllers/todo")
const UserController = require("../controllers/user")

const todoRoutes = require("./todo")

router.get("/", TodoController.test)
// router.use("/todos", todoRoutes)
router.post("/signup", UserController.signup)
router.post("/signin", UserController.signin)

module.exports = router