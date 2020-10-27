const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");


//create
router.post("/", todoController.addTodo);
//read
router.get("/", todoController.showTodo)
router.get("/:id", todoController.detailTodo);

//update
// router.put("/:id", todoController.update);

//status
// router.patch("/:id", todoController.update);

//delete
// router.delete("/:id", todoController.delete);


// router.get("/register", todoController.register);
// router.get("/login", todoController.login);

module.exports = router;
