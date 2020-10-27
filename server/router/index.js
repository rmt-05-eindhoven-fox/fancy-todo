'use strict'

const router = require('express').Router();
const todosRouter = require('./todo-routes.js');
const usersRouter = require('./user-routes.js')

router.use('/todos', todosRouter);
router.use(usersRouter)

module.exports = router;