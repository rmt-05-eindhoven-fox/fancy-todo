const router = require('express').Router()
const todo_router = require('./todo_router/todo_router')
const user_router = require('./user_router/user_router')
const NyTimes_router = require('./NyTimes_router/NyTimes_routes')

router.use('/user', user_router)
router.use('/todos', todo_router)
router.use('/nytimes', NyTimes_router)

module.exports = router