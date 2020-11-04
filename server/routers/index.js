const router = require('express').Router();
const PhotoController = require('../controllers/PhotoController');
const TodoRouter = require('./todos')
const UserRouter = require('./users')

// Prevent Heroku from idling
router.get('/ping', (req, res) => {
   res.status(200).json({
      message: "Server is now prevented from sleeping"
   })

   // console.log({message: "Server is now prevented from sleeping"});
})

router.use('/user', UserRouter)
router.use('/todos', TodoRouter)
router.get('/photos', PhotoController.getBackgroundImage)

module.exports = router