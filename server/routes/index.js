const express = require("express")
const router = express.Router()
const todoRouter = require("./todos")
const userRouter = require("./users")

router.use("/todos", todoRouter)
router.use("/", userRouter)

module.exports = router