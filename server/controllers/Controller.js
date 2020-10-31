const { Todo } = require('../models/')
const {Op} = require('sequelize')
const {verifyToken} = require('../helpers/jwt')
const { convertFromDate, convertToDate, convertToWords } = require('../helpers/dates')


class Controller{
    
    // 💈=== GET ===💈 //

    static async getTodos(req, res, next) {
        try {
            const { id } = verifyToken(req.headers.token)
            
            let todos = await Todo.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
                where : {
                    UserId : id
                },
                order : [
                    ['due_date', 'ASC'],
                    ['status', 'DESC']
                    
                ]
            })
            // Todo is in array. due_date needs to be converted
            let returnedTodo = []
            if( todos.length > 0 ) {
                todos.forEach(todo => {
                    const { id, title, description, status, due_date, UserId } = todo
                    returnedTodo.push({
                        id, title, description, status, 
                        due_date : convertFromDate(due_date), 
                        due_date_words : convertToWords(due_date),
                        UserId 
                    })
                })

            }
            // todos.due_date = convertFromDate(due_date)
            res.status(200).json(returnedTodo)

        } catch (error) {
            next(error)
        }
    }

    static async getOneTodo(req, res, next) {
        
        const { id } = verifyToken(req.headers.token)
        const todoId = +req.params.id
        try {
            const todos = await Todo.findByPk(todoId,{
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }, 
                where : {
                    UserId : id
                }
            })

            let returnedTodo 

            returnedTodo = {
                id : todos.id, 
                title : todos.title, 
                description : todos.description, 
                status : todos.status, 
                due_date : convertFromDate(todos.due_date), 
                UserId : todos.UserId
            }

            res.status(200).json(returnedTodo)

        } catch (error) {
            next(error)
        }
    }

    // 💈=== POST ===💈 //

    static async postNewTodo(req, res, next) {

        const { id } = verifyToken(req.headers.token)
        let { title, description, due_date } = req.body

        let status = "Not Done"

        try {
            const newTodo = await Todo.create({
                title, 
                description, 
                status, 
                due_date, 
                UserId : id
            })

  

            res.status(201).json(newTodo)

        } catch (error) {
            next(error)
        }
    }


    // 💈=== PUT ===💈 //

    static async putUpdatedTodo(req, res, next) {
        // const id = +req.params.id
        let { id, title, description, due_date } = req.body

        due_date = convertToDate(due_date)

        try {
            const newTodo = await Todo.update({
                title, description, due_date
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
                    message : `Error can't find Todo`
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