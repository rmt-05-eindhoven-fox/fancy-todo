const router = require("express").Router()
const todoRouter = require("./Todos.js")

router.use('/todos', todoRouter)

module.exports = router