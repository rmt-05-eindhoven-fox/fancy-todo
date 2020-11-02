const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/TodoController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", TodoController.getTodo)
router.post("/", TodoController.postTodo)
router.get("/:id", authorization, TodoController.getTodoById)
router.put("/:id", authorization, TodoController.putTodoById)
router.patch("/:id", authorization, TodoController.patchTodoById)
router.delete("/:id", authorization, TodoController.deleteTodoById)

module.exports = router