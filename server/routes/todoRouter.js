const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.get('/', TodoController.showAll)
router.post('/', TodoController.add)

router.get('/:id', TodoController.find)
router.put('/:id', TodoController.edit)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.delete)

module.exports = router;