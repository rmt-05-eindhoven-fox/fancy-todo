const router = require('express').Router();
const Controller = require('../controllers/TodoController')
const Authentication = require('../middlewares/Authentication')
const Authorization = require('../middlewares/Authorization')
const UserRoutes = require('./user')

router.use(UserRoutes);
router.use(Authentication);

router.post('/todos', Controller.create)
router.get('/todos', Controller.showTodos)

router.get('/todos/:id', Authorization, Controller.showTodo)
router.put('/todos/:id', Authorization, Controller.update)
router.patch('/todos/:id', Authorization, Controller.patchTodo)

router.delete('/todos/:id', Authorization, Controller.delete)


module.exports = router