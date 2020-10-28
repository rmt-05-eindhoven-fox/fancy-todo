const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')
const albumRoutes = require('./album')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)
router.use('/albums', albumRoutes)

module.exports = router