const express = require('express');
const router = express.Router();
const controller = require("../controllers/TodoController")
const authorization = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")


router.use(authentication)
router.post('/', authorization,controller.Create)
router.get('/', authorization,controller.GetTodo)
router.get('/:id', authorization,controller.GetTodoById)
router.put('/:id', authorization, controller.Update)
router.delete('/:id', authorization, controller.Delete)
router.patch('/:id', authorization, controller.UpdateStatus)
router.get('/project/:project_id', authorization,controller.GetTodoByProjectId)


module.exports = router;
