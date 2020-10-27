'use strict'

const router = require('express').Router()
const HomeController = require('../controllers/homecontroller')
const todoRouter = require('./todo')
const WeatherRoutes = require('./WeatherRoute')



router.get('/', HomeController.home)
router.post('/register', HomeController.register)
router.post('/login', HomeController.login)


router.use('/todos', todoRouter)
router.use('/weathers',WeatherRoutes)


module.exports = router