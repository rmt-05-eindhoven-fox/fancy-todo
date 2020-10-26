const router = require('express').Router()
const ToDoController = require('../controllers/controller')

router.post('/todos/add', ToDoController.add)
router.get('/todos/', ToDoController.findAll)
router.get('/todos/:id', ToDoController.findOne)
router.put('/todos/edit/:id', ToDoController.edit)
router.patch('/todos/edit/:id', ToDoController.editStatus)
router.delete('/todos/delete/:id', ToDoController.deleted)

module.exports = router