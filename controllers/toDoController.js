const { Todo } = require('../models')

class TodoController {
    static async findAll (req,res) {
        //console.log(`masuk sini`)
        try {
            const todos = await Todo.findAll()
            //console.log(todos)
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)
            //console.log(error)
        }
    }

    static async create(req,res) {
        const { title, description, status, due_date} = req.body
        try {
            const newTodo = await Todo.create({title, description, status, due_date})
            res.status(201).json(newTodo)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async findById(req,res) {
        try {
            const todo = await Todo.findByPk(req.params.id)
            res.status(200).json({todo})
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = TodoController