const TodoController = require('../controllers/TodoController');
const todoAuthorize = require('../middleware/autorization');

const todoRouter = require('express').Router();

todoRouter.get('/', TodoController.index);
todoRouter.post('/', TodoController.store);
todoRouter.get('/calender/holiday', TodoController.holiday);
todoRouter.get('/:id', todoAuthorize, TodoController.show);
todoRouter.put('/:id', todoAuthorize, TodoController.update);
todoRouter.patch('/:id', todoAuthorize, TodoController.patch);
todoRouter.delete('/:id', todoAuthorize, TodoController.destroy);

module.exports = todoRouter;
