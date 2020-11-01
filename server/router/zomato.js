const router = require('express').Router()
const ZomatoController = require('../controllers/zomato')

router.get('/restaurant/:res_id', ZomatoController.restaurant)

module.exports = router