const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')
const favqRoutes =require('./favq')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)
router.use('/', favqRoutes)

module.exports = router