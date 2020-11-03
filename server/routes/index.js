const router = require('express').Router();
const todoRouter = require('./todoRouter');
const UserController = require('../controllers/UserController');
const loginRouter = require('./loginRouter');
const { authentication } = require('../middleware/auth');
const apiRouter = require('./apiRouter');

router.use('/login', loginRouter);

router.post('/register', UserController.register);

router.use(authentication);

router.use('/apis', apiRouter);

router.use('/todos', todoRouter);

module.exports = router;