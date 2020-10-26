const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get('/todos', Controller.getTodos)
router.post('/todos', Controller.postNewTodo)

router.post('/register', Controller.postUserRegister)
router.post('/login', Controller.postUserLogin)


router.get('/todos/:id', Controller.getOneTodo)
router.put('/todos/:id', Controller.putUpdatedTodo)
router.patch('/todos/:id', Controller.patchTodoStatus)
router.delete('/todos/:id', Controller.deleteTodo)

module.exports = router