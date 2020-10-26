const router  = require("express").Router()
const todoController = require("../controllers/todo.Controller")

router.post("/", todoController.create)
router.get("/", todoController.findAll)
router.put("/:id", todoController.updateAll)
router.patch("/:id", todoController.updateStatus)
router.delete("/:id", todoController.delete)
module.exports  = router 