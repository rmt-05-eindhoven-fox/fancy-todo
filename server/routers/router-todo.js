const router = require('express').Router();
const TodoController = require("../controllers/TodoController");

router.post("/", TodoController.createTodo);
router.get("/", TodoController.readTodo);
router.get("/:id", TodoController.getTodoById)
router.put("/:id", TodoController.updateTodoById)
router.patch("/:id", TodoController.updateStatusTodoById)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router;