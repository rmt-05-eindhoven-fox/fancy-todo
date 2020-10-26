const TodoController = require('../controllers/TodoController');

const todoRouter = require('express').Router();

todoRouter.get('/', TodoController.index);
todoRouter.post('/', TodoController.store);
todoRouter.get('/:id', TodoController.show);
todoRouter.put('/:id', TodoController.update);
todoRouter.patch('/:id', TodoController.patch);
todoRouter.delete('/:id', TodoController.destroy);

module.exports = todoRouter;
