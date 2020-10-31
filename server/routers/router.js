const router = require('express').Router();
const routerUser = require("./router-user");
const routerTodo = require("./router-todo");
const routerQuote = require("./router-quote");
const routerNews = require("./router-news");

// User
router.use("/", routerUser);

// Todo
router.use("/todos", routerTodo);

// 3rd API
router.use("/quotes", routerQuote);
router.use("/news", routerNews);

module.exports = router;