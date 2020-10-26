const router = require('express').Router();
const todoRouter = require('./todo.js');
const userRouter = require('./user');

router.use('/user', userRouter)

router.use('/todos', todoRouter)

module.exports = router;