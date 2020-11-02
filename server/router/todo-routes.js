'use strict'

const TodosController = require('../controllers/todos-controller');
const authorization = require('../middlewares/authorization.js');

const router = require('express').Router()

router.get('/', TodosController.getTodos);
router.post('/', TodosController.postTodos);
router.get('/:id', authorization, TodosController.getTodosbyId);
router.put('/:id', authorization, TodosController.putTodos);
router.patch('/:id', authorization, TodosController.patchTodos);
router.delete('/:id', authorization, TodosController.deleteTodos);

module.exports = router;