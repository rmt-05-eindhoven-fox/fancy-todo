const todoRouter = require('./todo');
const userRouter = require('./user');

const router = require('express').Router();

router.use(todoRouter);
router.use(userRouter);

module.exports = router