const router = require('express').Router()
const routerTodo = require('./todos')
const routerUsers = require('./users')
const routerMovies = require('./movies')

router.use('/todos', routerTodo)
router.use('/users', routerUsers)
router.use('/movies', routerMovies)

module.exports = router