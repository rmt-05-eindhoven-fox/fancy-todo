const route = require('express').Router()
const todoController = require('../controllers/toDoController')

route.get('/', (req,res) => {
    res.send(`tes`)
})

route.get('/todos', todoController.findAll)
route.post('/todos', todoController.create)
route.get('/todos/:id', todoController.findById)

module.exports = route

