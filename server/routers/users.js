const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// router.use(authentication)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/googleLogin', UserController.googleLogin)

router.patch('/add-discord', UserController.addDiscordUsername)

// router.get('/check/:email', authentication, authorization, UserController.getUserInfo)

// router.put('/check/:id', authentication, UserController.editUserInfo)

module.exports = router