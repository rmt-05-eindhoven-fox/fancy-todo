const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/', TodoController.getAllTodos)

router.post('/', TodoController.createTodo)

router.get('/:id', authorization, TodoController.getTodoById)

router.put('/:id', authorization, TodoController.editTodoById)

router.patch('/:id', authorization, TodoController.editTodoStatusById)

router.delete('/:id', authorization, TodoController.deleteTodoById)

module.exports = router