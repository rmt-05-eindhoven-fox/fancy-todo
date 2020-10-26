const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get('/todos', Controller.getTodos)
router.post('/todos', Controller.postNewTodo)


router.get('/todos/:id', Controller.getOneTodo)
router.put('/todos/:id', Controller.putUpdatedTodo)

module.exports = router