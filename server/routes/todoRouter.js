const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')
const todoProjectAuthorization = require('../middlewares/projectTodoAuthorization')

router.get('/', TodoController.showAll)
router.post('/', TodoController.add)

router.get('/:id', authorization, TodoController.find)
router.put('/:id', authorization, TodoController.edit)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.delete)

//authorization
router.get('/project/:id', todoProjectAuthorization, TodoController.getTodoProject)

module.exports = router;