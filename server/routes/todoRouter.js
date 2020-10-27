const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// router.get('/', (req, res) => {
//   res.send('asdada')
// })
router.use(authentication)
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findOneTodo)
router.post('/', TodoController.createTodo)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.updateTodoStatus)
router.delete('/:id', authorization, TodoController.deleteTodo)


module.exports = router