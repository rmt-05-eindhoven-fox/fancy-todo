const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.login)

router.post('/todos', Controller.todoAdd)

router.get('/todos', Controller.todoList)

router.get('/todos/:id', Controller.todoId)

router.put('/todos/:id', Controller.todoPut)

router.patch('/todos/:id', Controller.todoPatch)

router.delete('/todos/:id', Controller.delete)


module.exports = router