const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");


router.use(authentication);
//create
router.post("/todos", todoController.addTodo);
//read
router.get("/todos", todoController.showTodo);
router.get("/todos/:id", todoController.detailTodo);
//update
router.put("/todos/:id", todoController.update);
//status
router.patch("/todos/:id", todoController.status);
//delete
router.delete("/todos/:id", todoController.delete);
//register & login
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;
