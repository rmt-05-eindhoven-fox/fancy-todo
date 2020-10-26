'use strict'

const TodosController = require('../controllers/todos-controller');

const router = require('express').Router()

router.get('/todos', TodosController.getTodos);
router.post('/todos', TodosController.postTodos);
router.get('/todos/:id', TodosController.getTodosbyId);
router.put('/todos/:id', TodosController.putTodos);
router.patch('/todos/:id', TodosController.patchTodos);
router.delete('/todos/:id', TodosController.deleteTodos);

module.exports = router;