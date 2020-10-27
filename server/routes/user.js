const Controller = require('../controllers/control')
const userRouter = require('express').Router()

userRouter.post('/register', register)
userRouter.post('/login', login)

module.exports = userRouter