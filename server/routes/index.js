const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')

router.use('/', todoRoutes)
router.use('/', userRoutes)

module.exports = router