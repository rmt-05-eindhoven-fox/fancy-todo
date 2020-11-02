const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController')

router.post('/', controller.googleLogin)

module.exports = router 