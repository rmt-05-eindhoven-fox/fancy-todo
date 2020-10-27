'use strict'

const router = require('express').Router()
const UsersController = require('../controllers/users-controller.js')

router.post('/register', UsersController.postRegister);
router.post('/login', UsersController.postLogin);

module.exports = router;