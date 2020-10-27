const TodoController = require('../controllers/todo');

const todoRouter = require('express').Router();

todoRouter.get('/todos',TodoController.findAll);
todoRouter.post('/todos', TodoController.create);
todoRouter.get('/todos/:id', TodoController.findId);
todoRouter.put('/todos/:id', TodoController.update);
todoRouter.patch('/todos/:id', TodoController.updateStatus);
todoRouter.delete('/todos/:id', TodoController.delete);


module.exports = todoRouter