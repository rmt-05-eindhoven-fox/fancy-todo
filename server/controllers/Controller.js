const { Todo } = require('../models/')
const {Op} = require('sequelize')


class Controller{
    
    // 💈=== GET ===💈 //

    static async getTodos(req, res, next) {
        try {
            const { userId } = req.loggedInUser

            const todos = await Todo.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
                where : {
                    UserId : userId
                }
            })
            res.status(200).json(todos)

        } catch (error) {
            next(error)
        }
    }

    static async getOneTodo(req, res, next) {
        const { userId } = req.loggedInUser
        const id = +req.params.id
        try {
            const todos = await Todo.findByPk(id,{
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }, 
                where : {
                    UserId : userId
                }
            })
            res.status(200).json(todos)

        } catch (error) {
            next(error)
        }
    }

    // 💈=== POST ===💈 //

    static async postNewTodo(req, res, next) {
        const { userId } = req.loggedInUser
        const { title, description, status, due_date } = req.body

        try {
            const newTodo = await Todo.create({
                title, 
                description, 
                status, 
                due_date, 
                UserId : userId
            })

            const returnedTodo = {
                id : newTodo.id,
                title : newTodo.title,
                description : newTodo.description,
                status : newTodo.status,
                due_date : newTodo.due_date,
                UserId : userId
            }

            res.status(201).json(returnedTodo)

        } catch (error) {
            next(error)
        }
    }


    // 💈=== PUT ===💈 //

    static async putUpdatedTodo(req, res, next) {
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
            next(error)
        }
    }
    // 💈=== PATCH ===💈 //

    static async patchTodoStatus(req, res, next) {
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
                next({
                    status : 404,
                    message : `Error not found`
                })
            }

        } catch (error) {
            next(error)
        }
    }

    // 💈=== DELETE ===💈 //

    static async deleteTodo(req, res, next) {
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
                next({
                    status : 404,
                    message : `Can't find ID`
                })
            }

        } catch (error) {
            next(error)
        }
    }


   

}

module.exports = Controller