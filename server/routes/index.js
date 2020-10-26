const router = require('express').Router();
const todosRouter = require('./todos.js');

router.use('/todos', todosRouter)

module.exports = router;