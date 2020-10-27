const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.showAll)
router.post('/', TodoController.add)

router.get('/:id', authorization, TodoController.find)
router.put('/:id', authorization, TodoController.edit)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router;