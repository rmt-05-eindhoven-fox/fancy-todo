const router = require('express').Router()
const TodoRouter = require('./todo')
const UserRouter = require('./user')

router.use('/todos', TodoRouter)
router.use('/users', UserRouter)

module.exports = router