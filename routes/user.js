const router = require('express').Router();
const UserController = require('../Controller/userController.js');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
// router.get('/logout', UserController.logout);

module.exports = router;