const TodoController = require('../controllers/todo');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const todoRouter = require('express').Router();

todoRouter.use(authentication);
todoRouter.get('/todos',TodoController.findAll);
todoRouter.post('/todos', TodoController.create);
todoRouter.get('/todos/:id', TodoController.findId);
todoRouter.put('/todos/:id', TodoController.update);
todoRouter.patch('/todos/:id', TodoController.updateStatus);
todoRouter.delete('/todos/:id', authorization, TodoController.delete);


module.exports = todoRouter