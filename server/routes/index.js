const express = require('express')
const router = express.Router()
const todoRoutes = require('./todos')


router.use('/todos', todoRoutes)


module.exports = router