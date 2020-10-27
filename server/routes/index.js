const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.get("/", homeController.homepage);

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/todos2", authentication, todoController.viewAll);

router.post("/todos", todoController.create);
//router.get("/todos", todoController.viewAll);
router.get("/todos/:id", todoController.viewById);
router.put("/todos/:id", todoController.updateAll);
router.patch("/todos/:id", todoController.updateStatus);
router.delete("/todos/:id", todoController.delete);


module.exports = router;