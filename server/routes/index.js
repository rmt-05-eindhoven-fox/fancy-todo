const express = require('express')
const router = express.Router()
const todoRoutes = require('./todos')
const userRoutes = require('./users')


router.use('/todos', todoRoutes)
router.use('/users', userRoutes)


module.exports = router