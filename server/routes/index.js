const router = require('express').Router();
const Controller = require('../controllers/TodoController')

router.post('/todos', Controller.create)
router.get('/todos', Controller.showTodos)

router.get('/todos/:id', Controller.showTodo)
router.put('/todos/:id', Controller.update)
router.patch('/todos/:id', Controller.patchTodo)

router.delete('/todos/:id', Controller.delete)


module.exports = router