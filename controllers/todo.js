const { Todo } = require("../models")

class TodoController {

    static async showTodos (req, res) {
        try {
            const todos = await Todo.findAll({
                where: {
                    UserId: req.User.id
                }
            })
            res.status(200).json({
                todos
            })
        } catch(err) {
            res.send(500).json({err})
        }
    }

    static async createTodo (req, res) {
        try {
            const newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.User.id
            }
            const todo = await Todo.create(newTodo)
            res.status(201).json({todo})
        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                res.status(401).json({err})
            } else {
                res.status(500).json({err})
            }
        }
    }

    static async showTodo (req, res) {
        try {
            const targetId = req.params.id

            const todo = await Todo.findByPk(targetId)
            if (todo === null) {
                throw new Error(`Todo not found`)
            }
            res.status(200).json(todo)
        } catch(err) {
            if (err.message === `Todo not found`) {
                res.status(404).json({error: err.message})
            } else {
                res.status(500).json({err})
            }
            
        }
    }

    static async updateTodo (req, res) {
        try {
            const targetId = req.params.id
            const newData = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }

            const todo = await Todo.update(newData, {
                where: {id: targetId}
            })
            if (todo === null) {
                throw new Error(`Todo not found`)
            }
            res.status(200).json({todo})

        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                res.status(400).json({err})
            } else if (err.message === `Todo not found`) {
                res.status(404).json({error: err.message})
            } else {
                res.status(500).json({err})
            }
        }
    }

    static async updateTodoStatus (req, res) {
        try {
            const targetId = req.params.id
            const newData = {
                status: req.body.status,
            }

            const todo = await Todo.update(newData, {
                where: {id: targetId}
            })
            res.status(200).json({todo})

        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                res.status(400).json({err})
            } else if (err.message === `Todo not found`) {
                res.status(404).json({error: err.message})
            } else {
                res.status(500).json({err})
            }
        }
    }

    static async deleteTodo (req, res) {
        try {
            const targetId = req.params.id

            const todo = await Todo.destroy({
                where: {id: targetId}
            })
            if (todo === 0) {
                throw new Error(`Todo not found`)
            }
            res.status(200).json({message: `${todo} success to delete`})
        } catch(err) {
            if (err.message === "Todo not found") {
                res.status(404).json({err})
            } else {
                res.status(500).json({err})
            }
        }
    }

}

module.exports = TodoController