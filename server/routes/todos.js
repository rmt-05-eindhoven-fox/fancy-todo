const router = require('express').Router()
const Controller = require('../controller/controllerTodo')
const authentication = require('../midleware/authentication')
const authorization = require('../midleware/authorization')

router.use(authentication)
router.get('/', Controller.allTodo)
router.post('/', Controller.postTodos)
router.put('/:id', authorization, Controller.putTodos)
router.get('/:id', authorization, Controller.getIdTodos)
router.patch('/:id', authorization, Controller.patchIdTodos)
router.delete('/:id', authorization, Controller.deleteIdTodos)

module.exports = router