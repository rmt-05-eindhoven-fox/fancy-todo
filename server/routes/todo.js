const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/', TodoController.view)

router.post('/', TodoController.add)

router.get('/:id', authorization, TodoController.viewOne)

router.put('/:id', authorization, TodoController.updatePut)

router.patch('/:id', authorization, TodoController.patch)

router.delete('/:id', authorization, TodoController.delete)

module.exports = router