const express = require("express");
const TodoController = require("../controllers/todo")
const router = express.Router();

router.post("/todos", TodoController.create)
router.get("/todos", TodoController.showAll)
router.get("/todos/:id", TodoController.findById)
router.put("/todos/:id", TodoController.updateOne)
router.patch("/todos/:id", TodoController.updateStatus)
router.delete("/todos/:id", TodoController.delete)

module.exports = router;
