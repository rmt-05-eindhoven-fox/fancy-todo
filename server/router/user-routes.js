'use strict'

const router = require('express').Router()
const UsersController = require('../controllers/users-controller.js')

router.post('/register', UsersController.postRegister);
router.post('/login', UsersController.postLogin);
router.post('/googleLogin', UsersController.googleLogin)

module.exports = router;