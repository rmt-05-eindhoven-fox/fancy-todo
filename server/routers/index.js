const router = require('express').Router()
const Controller = require('../controllers/Controller')
const UserController = require('../controllers/UserController')
const WeatherController = require('../controllers/WeatherController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
// const MovieController = require('../controllers/MovieController')

// router.get('/testMovie', MovieController.getPopularTv)
// router.get('/timoTweets', MovieController.getTimoTweets) // testing Twitter API

router.post('/register', UserController.postUserRegister)
router.post('/login', UserController.postUserLogin)
router.post('/googleLogin', UserController.postGoogleLogin)

router.use(authentication) // produce req.loggedInUser where we can access downwards

router.get('/todos', Controller.getTodos)
router.post('/todos', Controller.postNewTodo)

router.get('/weather/:location', WeatherController.getWeather)

router.put('/todos/:id', authorization, Controller.putUpdatedTodo)
router.patch('/todos/:id', authorization, Controller.patchTodoStatus)
router.get('/todos/:id', authorization,Controller.getOneTodo)
router.delete('/todos/:id', authorization, Controller.deleteTodo)

module.exports = router