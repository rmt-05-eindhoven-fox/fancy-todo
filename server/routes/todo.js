const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('', TodoController.add)

router.get('', TodoController.view)

router.get('/:id', TodoController.viewOne)

router.put('/:id', TodoController.updatePut)

router.patch('/:id', TodoController.patch)

router.delete('/:id', TodoController.delete)

module.exports = router