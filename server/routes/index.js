const CookController = require('../controllers/cook');
const todoRouter = require('./todo');
const userRouter = require('./user');

const router = require('express').Router();

router.use('/todos', todoRouter);
router.use(userRouter);
router.get('/listCook', CookController.findCook);

module.exports = router