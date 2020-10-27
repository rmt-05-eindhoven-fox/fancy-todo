const router = require("express").Router()
const authentication = require("../middlewares/authentication")
const TodoController = require("../controllers/todo")

router.use(authentication)

router.get("/", TodoController.showTodos)
router.post("/", TodoController.createTodo)
router.get("/:id", TodoController.showTodo)
router.put("/:id", TodoController.updateTodo)
router.patch("/:id", TodoController.updateTodoStatus)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router