const TodoController = require('../controllers/todo');

const todoRouter = require('express').Router();

todoRouter.get('/todos',TodoController.findAll);
todoRouter.post('/todos', TodoController.create);
todoRouter.get('/todos/:id', TodoController.findId);
todoRouter.put('/todos/:id', TodoController.update);


module.exports = todoRouter