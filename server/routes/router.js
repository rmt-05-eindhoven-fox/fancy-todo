const router = require("express").Router()
const Controller = require('../controllers/control')
const todoRouter = require('./todo')
const userRouter = require('./user')


router.get('/', Controller.landingPage)
router.use('/todos', todoRouter)
router.use('/user', userRouter)

module.exports=router