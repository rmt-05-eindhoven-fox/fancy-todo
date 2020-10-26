const router = require('express').Router()
const TodoRouter = require('./todo')

router.use('/todos', TodoRouter)

module.exports = router