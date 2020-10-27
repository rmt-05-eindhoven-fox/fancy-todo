const router = require('express').Router();
const TodoController = require("../controllers/TodoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.post("/", TodoController.createTodo);
router.get("/", TodoController.readTodo);
router.get("/:id", authorization, TodoController.getTodoById);
router.put("/:id", authorization, TodoController.updateTodoById);
router.patch("/:id", authorization, TodoController.updateStatusTodoById);
router.delete("/:id", authorization, TodoController.deleteTodo);

module.exports = router;