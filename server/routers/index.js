const router = require('express').Router()

const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

router.use(userRouter)
router.use(todoRouter)

module.exports = router;