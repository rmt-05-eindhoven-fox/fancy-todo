const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userController = require('../controllers/userController')

route.get('/', (req,res) => {
    res.send(`tes`)
})

route.post('/register', userController.register)
route.post('/login', userController.login)

route.use('/todos', todoRoute)
module.exports = route

