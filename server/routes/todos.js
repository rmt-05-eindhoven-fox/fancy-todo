const express = require('express')
const router = express.Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)

router.post('/', Controller.createTodo)

router.get('/', Controller.readTodo)

router.use('/:id', authorization)

router.get('/:id', Controller.searchTodoByUserId)

router.put('/:id', Controller.updateTodo)

router.patch('/:id', Controller.changeStatus)

router.delete('/:id', Controller.deleteTodo)


module.exports = router