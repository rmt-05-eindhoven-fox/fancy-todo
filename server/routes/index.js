const express = require('express')
const router = express.Router()
const todoRoutes = require('./todos')
const userRoutes = require('./users')
const quoteRoutes = require('./random-quotes')


router.use('/todos', todoRoutes)
router.use('/users', userRoutes)
router.use('/quotes', quoteRoutes)


module.exports = router