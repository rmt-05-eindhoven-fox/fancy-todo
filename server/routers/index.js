const router = require('express').Router()
const Controller =  require('../controllers/controller')

router.get('/todos', Controller.showTodos)
router.post('/todos', Controller.addTodo)

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.get('/todos/:id', Controller.getOneTodo)
router.put('/todos/:id', Controller.updateTodo)
router.patch('/todos/:id', Controller.patchTodo)
router.delete('/todos/:id', Controller.deleteTodo)


module.exports = router;