const { Todo } = require('../models')
const {Op} = require('sequelize')

class Controller{
    
    // 💈=== GET ===💈 //

    static async getTodos(req, res){
        try {
            const todos = await Todo.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(todos)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getOneTodo(req, res){
        const id = +req.params.id
        try {
            const todos = await Todo.findByPk(id,{
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(todos)

        } catch (error) {
            res.status(404).json(error)
        }
    }

    // 💈=== POST ===💈 //

    static async postNewTodo(req, res){
        const { title, description, status, due_date } = req.body

        try {
            const newTodo = await Todo.create({
                title, description, status, due_date
            })

            const returnedTodo = {
                id : newTodo.id,
                title : newTodo.title,
                description : newTodo.description,
                status : newTodo.status,
                due_date : newTodo.due_date
            }

            res.status(201).json(returnedTodo)

        } catch (error) {
            res.status(400).json(error)
        }
    }


    // 💈=== PUT ===💈 //

    static async putUpdatedTodo(req, res){
        const id = +req.params.id
        const { title, description, status, due_date } = req.body

        try {
            const newTodo = await Todo.update({
                title, description, status, due_date
            },{

                where : { id },
                returning : ['id', 'title', 'description', 'status', 'due_date']
            })
            
            res.status(200).json(newTodo[1][0])

        } catch (error) {
            res.status(400).json(error)
        }
    }
    // 💈=== PATCH ===💈 //

    static async patchTodoStatus(req, res){
        const id = +req.params.id
        const { status } = req.body

        try {
            const newTodo = await Todo.update({
                status
            }, {
                where : { id },
                returning : ['id', 'title', 'description', 'status', 'due_date']
            })

            if(newTodo[0] > 0){
                res.status(200).json(newTodo[1][0])

            } else {
                res.status(404).json({
                    message : `Error not found`
                })
            }

        } catch (error) {
            res.status(404).json(error)
        }
    }

    // 💈=== DELETE ===💈 //

    static async deleteTodo(req, res){
        const id = +req.params.id

        try {
            const deleted = await Todo.destroy({
                where : { id }
            })

            if(deleted > 0){
                res.status(200).json({
                    message : 'todo success to delete'
                })
                
            } else {
                res.status(404).json({
                    message : `Can't find ID`
                })

            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = Controller