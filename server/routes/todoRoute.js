const route = require('express').Router()
const todoController = require('../controllers/toDoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('/', todoController.findAll)
route.post('/', todoController.create)
route.delete('/:id', authorization, todoController.delete)
route.get('/:id', todoController.findById)
route.put('/:id', todoController.updateAll)
route.patch('/:id', todoController.status)

module.exports = route

