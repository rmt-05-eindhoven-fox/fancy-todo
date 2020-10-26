const router = require('express').Router();

const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.getAllTodos)

router.post('/', TodoController.createTodo)

router.get('/:id', TodoController.getTodoById)

router.put('/:id', TodoController.editTodoById)

router.patch('/:id', TodoController.editTodoStatusById)

router.delete('/:id', TodoController.deleteTodoById)

module.exports = router