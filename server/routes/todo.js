const TodoController = require('../controllers/todo');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const todoRouter = require('express').Router();

todoRouter.use(authentication);
todoRouter.get('/', TodoController.findAll);
todoRouter.get('/false', TodoController.findTrue);
todoRouter.post('/', TodoController.create);
todoRouter.get('/:id', authorization, TodoController.findId);
todoRouter.put('/:id', authorization, TodoController.update);
todoRouter.patch('/:id', authorization, TodoController.updateStatus);
todoRouter.delete('/:id', authorization, TodoController.delete);


module.exports = todoRouter;