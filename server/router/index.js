'use strict'

const router = require('express').Router();
const authentication = require('../middlewares/authentication.js');
const todosRouter = require('./todo-routes.js');
const usersRouter = require('./user-routes.js');
const quotesRouter = require('./pq-routes');

router.use(usersRouter);

router.use(authentication);
router.use('/todos', todosRouter);
router.use('/quotes', quotesRouter);

module.exports = router;