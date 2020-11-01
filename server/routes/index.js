const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const notificationRouter = require('./notificationRouter')
const userProjectRouter = require('./userProjectRouter')
const newsRouter = require('./newsRouter')

const authentication = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use('/news', newsRouter)

router.use(authentication)
router.use('/todos', todoRouter)
router.use('/projects', projectRouter)
router.use('/notifications', notificationRouter)
router.use('/userprojects', userProjectRouter)


module.exports = router