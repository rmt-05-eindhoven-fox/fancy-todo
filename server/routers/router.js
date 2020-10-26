const router = require('express').Router();
const routerTodo = require("./router-todo");

// Todo
router.use("/todos", routerTodo);

module.exports = router;