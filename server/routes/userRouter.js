const UserController = require('../controllers/UserController');
const auth = require('../middleware/authentication');

const userRouter = require('express').Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/googlesignin', UserController.googlesignin);
userRouter.post('/verifytoken', auth, UserController.verifyToken);

module.exports = userRouter;
