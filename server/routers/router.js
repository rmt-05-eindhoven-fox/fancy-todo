const router = require('express').Router();
const TodoController = require("../controllers/TodoController");

router.post("/todos", TodoController.createTodo);
router.get("/todos", TodoController.readTodo);
router.get("/todos/:id", TodoController.getTodoById)
router.put("/todos/:id", TodoController.updateTodoById)
router.patch("/todos/:id", TodoController.updateStatusTodoById)
router.delete("/todos/:id", TodoController.deleteTodo)

module.exports = router;