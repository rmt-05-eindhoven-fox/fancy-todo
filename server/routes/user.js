const UserController = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/googleLogin', UserController.googleLogin);

module.exports = userRouter;
