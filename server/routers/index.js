const router = require('express').Router()
const ToDoController = require('../controllers/controller')

router.post('/add', ToDoController.add)
router.get('/', ToDoController.findAll)
router.get('/:id', ToDoController.findOne)
router.put('/edit/:id', ToDoController.edit)
router.patch('/edit/:id', ToDoController.editStatus)
router.delete('/delete/:id', ToDoController.deleted)

module.exports = router