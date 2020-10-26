const router = require("express").Router()
const todoController = require("./todo.Router")


router.use("/todos",todoController)

module.exports = router