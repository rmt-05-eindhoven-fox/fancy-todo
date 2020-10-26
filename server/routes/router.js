const router = require("express").Router()
const TodoController = require("../controller/todoController")

router.post("/todos", TodoController.todoAdd)
router.get("/todos", TodoController.todoShow)
router.get("/todos/:id", TodoController.todoShowById)
router.put("/todos/:id", TodoController.todoUpdate)
router.patch("/todos/:id", TodoController.todoUpdateStatus)
router.delete("/todos/:id", TodoController.todoDelete)

module.exports = router