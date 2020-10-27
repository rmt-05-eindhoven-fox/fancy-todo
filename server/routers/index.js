const router = require('express').Router()
const Controller = require('../controllers/Controller')
const UserController = require('../controllers/UserController')
const MovieController = require('../controllers/MovieController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/testMovie', MovieController.getPopularTv)
// router.get('/timoTweets', MovieController.getTimoTweets)

router.post('/register', UserController.postUserRegister)
router.post('/login', UserController.postUserLogin)

router.use(authentication)

router.get('/todos', Controller.getTodos)
router.post('/todos', Controller.postNewTodo)


router.put('/todos/:id', Controller.putUpdatedTodo)
router.patch('/todos/:id', Controller.patchTodoStatus)

router.get('/todos/:id', authorization,Controller.getOneTodo)
router.delete('/todos/:id', authorization, Controller.deleteTodo)

module.exports = router