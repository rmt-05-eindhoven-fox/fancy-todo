const express = require("express");
const TodoController = require("../controllers/todo")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const router = express.Router();

router.use(authentication)

router.post("/", TodoController.create)
router.get("/", TodoController.showAll)

router.get("/:id", authorization, TodoController.findById)
router.put("/:id", authorization, TodoController.updateOne)
router.patch("/:id", authorization, TodoController.updateStatus)
router.delete("/:id", authorization, TodoController.delete)

module.exports = router;
