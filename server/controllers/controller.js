const { Todo } = require('../models/index')


class Controller {
    static async todoAdd(req, res, next) {
        try {
            const inputTodo = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                userId: req.loggedInUser.id
            }
            const newTodo = await Todo.create(inputTodo)

            res.status(201).json(newTodo)
        } catch (err) {
            next(err)
        }

    }
    static async todoList(req, res, next) {
        const userId = req.loggedInUser.id
        try {
            const todoList = await Todo.findAll({where: {userId: userId}, order: [['createdAt', 'DESC']]})

            res.status(200).json(todoList)
        } catch (error) {
            next(error)
        }
    }
    static async todoId(req, res, next) {
        try {
            const id = +req.params.id
            const todoId = await Todo.findByPk(id)

            if(todoId) {
                res.status(200).json(todoId)
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async todoPut(req, res, next) {
        try {
            const id = +req.params.id
            const dataTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }

            const updateTodo = await Todo.update(dataTodo, {where: {id: id}, returning: true} )

            if(updateTodo[1][0]) {
                res.status(200).json(updateTodo[1][0]) 
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async todoPatch(req, res, next) {
        try {
            const id = +req.params.id
            const dataTodo = {
                status: req.body.status
            }

            const updateTodo = await Todo.update(dataTodo, {where: {id: id}, returning: true} )
            if(updateTodo[1][0]) {
                res.status(200).json(updateTodo[1][0])
            } else {
                throw { name: 'Not Found'}
            }
              
        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const id = +req.params.id

            const deleteTodo = await Todo.destroy( {where: {id: id}, returning: true} )

            if(deleteTodo) {
                res.status(200).json({ message: 'todo success to delete' }) 
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }
}


module.exports = Controller