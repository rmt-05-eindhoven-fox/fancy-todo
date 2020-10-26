const { Todo } = require('../models/index')

class Controller {
    static login(req, res) {
        res.send('LOGIN')
    }
    static async todoAdd(req, res) {
        try {
            const inputTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            console.log(inputTodo)
            const newTodo = await Todo.create(inputTodo)

            res.status(201).json(newTodo)
        } catch (err) {
            res.status(500).json({
                message: "Server is busy"
            })
        }

    }
    static todoList(req, res) {
        res.send('todoList')
    }
    static todoId(req, res) {
        res.send('todoId')
    }
    static todoPut(req, res) {
        res.send('todoPut')
    }
    static todoPatch(req, res) {
        res.send('todoPatch')
    }
    static delete(req, res) {
        res.send('delete')
    }
}


module.exports = Controller