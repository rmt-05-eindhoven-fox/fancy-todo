const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/', TodoController.post)
router.get('/', TodoController.get)
router.get('/:id', TodoController.findId)
router.put('/:id', TodoController.put)
router.patch('/:id', TodoController.patch)
router.delete('/:id', TodoController.delete)

module.exports = router