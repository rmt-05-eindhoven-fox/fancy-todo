const UserController = require('../controllers/UserController');

const userRouter = require('express').Router();

userRouter.post('/signup', UserController.signup);
userRouter.post('/signin', UserController.signin);

module.exports = userRouter;
