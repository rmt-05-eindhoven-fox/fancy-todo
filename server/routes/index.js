const router = require('express').Router()
const todoRouter = require('./todoRouter')

router.use('/todos', todoRouter)

module.exports = router