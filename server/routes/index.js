const router = require('express').Router();
const todoRouter = require('./todoRouter');
const UserController = require('../controllers/UserController');
const { thirdPartyLogin } = require('../middleware/thirdPartyLogin');
const { authentication } = require('../middleware/auth');
const apiRouter = require('./apiRouter');

router.post('/login', UserController.login);

router.post('/register', thirdPartyLogin, UserController.register);

router.use(authentication);

router.use('/apis/', apiRouter);

router.use('/todos', todoRouter);

module.exports = router;