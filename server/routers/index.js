const router = require('express').Router()

const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const weatherRouter = require("./weatherRouter");


router.use(userRouter)
router.use(weatherRouter)
router.use('/todos', todoRouter)


module.exports = router;