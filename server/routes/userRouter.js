const UserController = require('../controllers/UserController');

const userRouter = require('express').Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/googlesignin', UserController.googlesignin);

module.exports = userRouter;
