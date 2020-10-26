const router = require("express").Router()
const todoController = require("../controllers/todosController.js")

router.post('/', todoController.createTodo)
router.get('/', todoController.findAllTodo)
router.get('/:id', todoController.getTOdoById)
router.put('/:id', todoController.updateTodo)
router.patch('/:id', todoController.updateStatus)
router.delete('/:id', todoController.deleteTodo)

module.exports = router