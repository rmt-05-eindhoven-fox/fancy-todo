const express = require('express')
const router = express.Router()
const Controller = require('../controllers/Controller')

router.post('/', Controller.createTodo)

router.get('/', Controller.readTodo)

router.get('/:id', Controller.searchTodoById)

router.put('/:id', Controller.updateTodo)

router.patch('/:id', Controller.changeStatus)

router.delete('/:id', Controller.deleteTodo)


module.exports = router