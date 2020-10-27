const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.use('/todos', todoRouter)
router.use('/users', userRouter)

module.exports = router