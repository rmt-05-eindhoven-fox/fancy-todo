const router = require('express').Router()
const TodoRouter = require('./todo')
const UserRouter = require('./user')
const ZomatoRouter = require('./zomato')
router.use('/todos', TodoRouter)
router.use('/users', UserRouter)
router.use('/zomato', ZomatoRouter)

module.exports = router