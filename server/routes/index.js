const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userController = require('../controllers/userController')


route.post('/register', userController.register)
route.post('/login', userController.login)

route.use('/todos', todoRoute)
module.exports = route

