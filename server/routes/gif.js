const router = require('express').Router()
const GifController = require('../controllers/gifControllers')

router.get('/', GifController.getGif)


module.exports = router