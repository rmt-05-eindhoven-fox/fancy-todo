const router = require("express").Router()
const TodoController = require("../controller/todoController")
const authorization = require("../middlewares/authorization")

router.post("/", TodoController.todoAdd)
router.get("/", TodoController.todoShow)

router.get("/:id",authorization, TodoController.todoShowById)
router.put("/:id",authorization, TodoController.todoUpdate)
router.patch("/:id",authorization, TodoController.todoUpdateStatus)
router.delete("/:id",authorization, TodoController.todoDelete)

module.exports = router