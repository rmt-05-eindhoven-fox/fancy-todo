const router = require('express').Router();
const todoRouter = require('./todoRouter');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/auth');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.use(authentication);

router.use('/todos', todoRouter);

module.exports = router;