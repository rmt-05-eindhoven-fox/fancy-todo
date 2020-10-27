const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const { authorization } = require('../middleware/auth');

router.post('/', TodoController.create);

router.get('/', TodoController.findAll);

router.use('/:id', authorization);

router.get('/:id', TodoController.findTodo);

router.put('/:id', TodoController.updateTodo);

router.patch('/:id', TodoController.patchTodo);

router.delete('/:id', TodoController.deleteTodo);

module.exports = router;