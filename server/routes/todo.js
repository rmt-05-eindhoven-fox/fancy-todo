const express = require('express');
const router = express.Router();
const controller = require("../controllers/todoController")

/* Post Todos. */
router.post('/todos', controller.CreateTodo)
router.get('/todos', controller.GetTodo)
router.get('/todos/:id', controller.GetTodoById)
router.put('/todos/:id', authorization, controller.UpdateTodoById)
router.delete('/todos/:id', authorization, controller.DeleteTodoById)
router.patch('/todos/:id', authorization, controller.PatchTodoById)

module.exports = router;
