const router = require('express').Router();
const PhotoController = require('../controllers/PhotoController');
const TodoRouter = require('./todos')
const UserRouter = require('./users')

router.use('/user', UserRouter)
router.use('/todos', TodoRouter)
router.get('/photos', PhotoController.getBackgroundImage)

module.exports = router