const router = require('express').Router()
const TodoController = require('../controllers/todoController')

// router.get('/', (req, res) => {
//   res.send('asdada')
// })
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findOneTodo)
router.post('/', TodoController.createTodo)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateTodoStatus)
router.delete('/:id', TodoController.deleteTodo)


module.exports = router