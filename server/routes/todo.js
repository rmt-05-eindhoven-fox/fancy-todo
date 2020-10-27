const express = require('express');
const router = express.Router();
const controller = require("../controllers/todoController")

/* Post Todos. */
router.post('/todos', controller.CreateTodo)
router.get('/todos', controller.GetTodo)
router.get('/todos/:id', controller.GetTodoById)
router.put('/todos/:id', controller.UpdateTodoById)
router.delete('/todos/:id', controller.DeleteTodoById)
router.patch('/todos/:id', controller.PatchTodoById)

module.exports = router;
