const TodoController = require("../controllers/todo")

const router = require("express").Router()

router.get("/", TodoController.showTodos)
router.post("/", TodoController.createTodo)
router.get("/:id", TodoController.showTodo)
router.put("/:id", TodoController.updateTodo)
router.patch("/:id", TodoController.updateTodoStatus)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router