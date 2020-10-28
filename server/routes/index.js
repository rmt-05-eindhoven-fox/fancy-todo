const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')


route.post('/register', userController.register)
route.post('/login', userController.login, errorHandler)

route.use('/todos', todoRoute)
module.exports = route

