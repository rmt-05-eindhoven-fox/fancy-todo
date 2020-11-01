const router = require('express').Router();
const Authentication = require('../middlewares/Authentication')
const Controller = require('../controllers/UserController')

router.post('/register', Controller.register);
router.post('/login', Controller.login)
router.post('/googleLogin', Controller.googleLogin)


module.exports = router