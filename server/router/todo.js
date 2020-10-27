const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)

router.post('/', TodoController.post)
router.get('/', TodoController.get)
router.get('/:id', TodoController.findId)
router.put('/:id', TodoController.put)
router.patch('/:id', TodoController.patch)
router.delete('/:id', authorization ,TodoController.delete)

module.exports = router