const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')
const gifRoutes = require('./gif')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)
router.use('/gif', gifRoutes)

module.exports = router