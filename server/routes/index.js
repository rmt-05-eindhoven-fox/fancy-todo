const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require('../middlewares/authorization')


router.use(authentication);
//create
router.post("/todos", todoController.addTodo);
//read
router.get("/todos", todoController.showTodo);
router.get("/todos/:id", todoController.detailTodo);
//update
router.put("/todos/:id",authorization, todoController.update);
//status
router.patch("/todos/:id", authorization, todoController.status);
//delete
router.delete("/todos/:id",authorization, todoController.delete);
//register & login
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;
