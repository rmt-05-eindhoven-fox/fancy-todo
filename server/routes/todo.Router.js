const router  = require("express").Router()
const todoController = require("../controllers/todo.controller")
const authorization = require("../middleware/authorization.middleware")

router.post("/", todoController.create)
router.get("/", todoController.findAll)
router.put("/:id", authorization,todoController.updateAll)
router.patch("/:id", authorization,todoController.updateStatus)
router.delete("/:id", authorization,todoController.delete)
module.exports  = router 