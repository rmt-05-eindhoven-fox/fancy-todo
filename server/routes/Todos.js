const router = require("express").Router()
const todoController = require("../controllers/todosController.js");
const authentication = require('../middlewares/authentication');
const authorization = require("../middlewares/authorized.js");

router.use(authentication);
router.post('/', todoController.createTodo);
router.get('/', todoController.findAllTodo);

router.get('/:id', authorization, todoController.getTodoById);
router.put('/:id', authorization, todoController.updateTodo);
router.patch('/:id', authorization, todoController.updateStatus);
router.delete('/:id', authorization, todoController.deleteTodo);

module.exports = router