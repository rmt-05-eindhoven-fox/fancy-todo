const { Todo } = require("../models")

class TodoController {

    static async showTodos (req, res, next) {
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
            next(err)
        }
    }

    static async createTodo (req, res, next) {
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
            next(err)
        }
    }

    static async showTodo (req, res, next) {
        try {
            const targetId = req.params.id

            const todo = await Todo.findByPk(targetId)
            if (!todo) {
                throw {message: `Todo not found`, status: 404}
            }
            res.status(200).json(todo)
        } catch(err) {
            next(err)
        }
    }

    static async updateTodo (req, res, next) {
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
            if (!todo) {
                throw {message: `Todo not found`, status: 404}
            }
            const updatedTodo = await Todo.findByPk(targetId)
            res.status(200).json({updatedTodo})

        } catch(err) {
            next(err)
        }
    }

    static async updateTodoStatus (req, res, next) {
        try {
            const targetId = req.params.id
            const newData = {
                status: req.body.status
            }

            const todo = await Todo.update(newData, {
                where: {id: targetId}
            })
            if (!todo) {
                throw {message: `Todo not found`, status: 404}
            }
            const updatedTodo = await Todo.findByPk(targetId)
            res.status(200).json({updatedTodo})

        } catch(err) {
            next(err)
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            const targetId = req.params.id
            const tempTodo = await Todo.findByPk(targetId)
            const todo = await Todo.destroy({
                where: {id: targetId}
            })
            if (!todo) {
                throw {message: `Todo not found`, status: 404}
            }
            res.status(200).json({message: `${tempTodo.title} success to delete`})
        } catch(err) {
            next(err)
        }
    }

}

module.exports = TodoController