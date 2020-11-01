const Weather = require('../controllers/weatherController')
const router = require('express').Router()

router.get('/weather', Weather.showWeather)

module.exports = router