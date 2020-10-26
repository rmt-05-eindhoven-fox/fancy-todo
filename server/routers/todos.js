const express = require('express')
const TodosController = require('../controllers/todosController')
const router = express.Router()

router.get('/', TodosController.list)
router.post('/', TodosController.addTodos)
router.get('/:id', TodosController.findTodos)
router.put('/:id', TodosController.updateTodos)
router.patch('/:id', TodosController.updateStatusTodos)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router