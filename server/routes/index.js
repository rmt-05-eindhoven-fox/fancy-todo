const todoRouter = require('./todo');

const router = require('express').Router();

router.use(todoRouter);

module.exports = router