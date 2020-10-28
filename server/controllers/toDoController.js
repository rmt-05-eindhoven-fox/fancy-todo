const { Todo } = require('../models')

class TodoController {
    static async findAll (req,res) {
        const userId = req.loggedInUser.id
        try {
            const todos = await Todo.findAll({
                where: {
                    userId
                }
            })
            //console.log(todos)
            res.status(200).json(todos)
            console.log(userId, 'INI USER')
        } catch (error) {
            res.status(500).json(error)
            //console.log(error)
        }
    }

    static async create(req,res, next) {
        const { title, description, status, due_date} = req.body
        const userId = req.loggedInUser.id
        // console.log(title, description, status, due_date)
        // console.log(userId, 'ini userid')
        try {
            const newTodo = await Todo.create({title, description, status, due_date, userId})
            res.status(201).json(newTodo)
        } catch (error) {
            next(error)
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
                await todo.destroy()
                await todo.save()
                res.status(200).json({msg: `todo has been deleted`})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TodoController