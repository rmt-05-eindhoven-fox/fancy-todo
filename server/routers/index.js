const router = require('express').Router();
const TodoRouter = require('./todos')
const UserRouter = require('./users')

router.use('/user', UserRouter)
router.use('/todos', TodoRouter)
// router.use('/photos', PhotoController)

module.exports = router