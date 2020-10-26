const router = require('express').Router();
const routerUser = require("./router-user");
const routerTodo = require("./router-todo");

// User
router.use("/", routerUser);

// Todo
router.use("/todos", routerTodo);

module.exports = router;