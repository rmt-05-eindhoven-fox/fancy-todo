const router = require("express").Router()

const UserController = require("../controllers/user")

const todoRoutes = require("./todo")

router.use("/todos", todoRoutes)
router.post("/signup", UserController.signup)
router.post("/signin", UserController.signin)

module.exports = router