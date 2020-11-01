const { Todo } = require('../models')

class TodoController {
    static async findAll (req,res, next) {
        const userId = req.loggedInUser.id
        try {
            const todos = await Todo.findAll({
                where: {
                    userId
                }
            })
            //console.log(todos)
            res.status(200).json({todos})
            console.log(userId, 'INI USER')
        } catch (error) {
            next(error)
        }
    }

    static async create(req,res, next) {
        //console.log(req.body)
        // console.log(title, description, status, due_date)
        // console.log(userId, 'ini userid')
        try {
            const userId = req.loggedInUser.id
            const { title, description, status, due_date} = req.body
            console.log(req.body, 'ini req body')
            const todo = await Todo.create({title, description, status, due_date, userId})
            res.status(201).json({todo})
        } catch (error) {
            console.log(error, 'ini error create')
            next(error)
        }
    }

    static async findById(req,res, next) {
        try {
            const todo = await Todo.findByPk(req.params.id)
            res.status(200).json({todo: todo})
        } catch (error) {
            next(error)
        }
    }

    static async updateAll(req,res, next) {
        try {
            //console.log('masuk')
            const {title, description, status, due_date} = req.body
            //console.log(req.body)
            const todo = await Todo.update({title, description,status,due_date}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(todo)
            //console.log(edit)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async status(req,res, next) {
        try{
            const {status} = req.body
            const todo = await Todo.findOne({
                where: {id: req.params.id}
            })
            //console.log(todo)
            if (todo) {
                todo.status = status 
                todo.save()
                res.status(200).json({todo:todo.status})
            } 
        } catch (error) {
            next(error)
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
            next(error)
        }
    }
}

module.exports = TodoController