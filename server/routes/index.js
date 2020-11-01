const router = require('express').Router();
const todoRouter = require('./todo.js');
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginGoogle', UserController.loginGoogle);

router.use('/todos', todoRouter)

module.exports = router;