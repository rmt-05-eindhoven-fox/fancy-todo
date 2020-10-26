const express = require("express")
const router = express.Router()
const Controller = require("../controllers")

router.get("/", Controller.getTodo)
router.post("/", Controller.postTodo)
router.get("/:id", Controller.getTodoById)
router.put("/:id", Controller.putTodoById)
router.patch("/:id", Controller.patchTodoById)
router.delete("/:id", Controller.deleteTodoById)

module.exports = router