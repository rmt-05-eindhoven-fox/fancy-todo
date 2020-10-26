const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.todos)
router.post('/', Controller.postTodo)
router.get('/:id', Controller.findById)
router.put('/:id', Controller.putTodo)
router.patch('/:id', Controller.patchTodo)
router.delete('/:id', Controller.deleteTodo)

module.exports = router