const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.login);

router.post('/google', UserController.loginGoogle);

module.exports = router;