const route = require('express').Router()
const todoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')

route.get('/', (req,res) => {
    res.send(`tes`)
})

route.post('/register', userController.register)
route.post('/login', userController.login)

route.get('/todos', todoController.findAll)
route.post('/todos', todoController.create)
route.get('/todos/:id', todoController.findById)
route.put('/todos/:id', todoController.updateAll)
route.patch('/todos/:id', todoController.status)
route.delete('/todos/:id', todoController.delete)

module.exports = route

