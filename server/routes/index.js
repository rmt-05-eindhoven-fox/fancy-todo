const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", homeController.homepage);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/glogin", userController.glogin);

router.use(authentication);
router.get("/todos", todoController.viewAll);
router.post("/todos", todoController.create);
router.get("/todos/:id", todoController.viewById);
router.put("/todos/:id", todoController.updateAll);
router.patch("/todos/:id", todoController.updateStatus);
router.delete("/todos/:id", authorization, todoController.delete);


module.exports = router;