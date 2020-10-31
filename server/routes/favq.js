const router = require('express').Router()
const FavqController = require('../controllers/favqController')

router.get('/quote', FavqController.qotd)

module.exports = router