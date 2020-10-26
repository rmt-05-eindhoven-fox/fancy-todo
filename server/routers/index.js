const router = require('express').Router();
const UserController = require('../controllers/UserController');
const TodoRouter = require('./todos')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/todos', TodoRouter)

module.exports = router