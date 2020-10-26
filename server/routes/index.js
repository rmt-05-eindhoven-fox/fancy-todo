const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/todos', TodoController.add)

router.get('/todos', TodoController.view)

router.get('/todos/:id', TodoController.viewOne)

router.put('/todos/:id', TodoController.updatePut)

router.patch('/todos/:id', TodoController.patch)

router.delete('/todos/:id', TodoController.delete)

module.exports = router