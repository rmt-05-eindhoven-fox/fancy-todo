const express = require("express")
const router = express.Router()
const todoRouter = require("./todos")
const userRouter = require("./users")

router.use("/", userRouter)
router.use("/todos", todoRouter)

module.exports = router