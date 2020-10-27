const router = require("express").Router()
const TodoController = require("../controller/todoController")

router.post('/todos', TodoController.add)
router.get('/todos', TodoController.list)
router.put('/todos/:id', TodoController.edit)
router.get('/todos/:id', TodoController.findOne)
router.patch('/todos/:id', TodoController.update)
router.delete('/todos/:id', TodoController.delete)

module.exports = router