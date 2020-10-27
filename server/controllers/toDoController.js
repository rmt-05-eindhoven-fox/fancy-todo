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

    static async updateAll(req,res) {
        try {
            const {title, description, status, due_date} = req.body
            //console.log(req.body)
            const edit = await Todo.update({title, description,status,due_date}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(edit)
            //console.log(edit)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async status(req,res) {
        try{
            const {status} = req.body
            const todo = await Todo.findOne({
                where: {id: req.params.id}
            })
            //console.log(todo)
            if (todo) {
                todo.status = status 
                todo.save()
                res.status(200).json(todo.status)
            } 
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req,res) {
        try {
            let todo = await Todo.findByPk(req.params.id)

            if(todo) {
                todo.destroy()
                todo.save()
                res.status(200).json({msg: `todo has been deleted`})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TodoController