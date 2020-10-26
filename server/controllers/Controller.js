const { Todo } = require('../models')

class Controller {
    static async createTodo(req, res) {
        const { title, description, status, due_date } = req.body
        try {
            const result = await Todo
            .create({
                title,
                description,
                status,
                due_date
            })
            const currentTime = new Date()
            if(due_date < currentTime){
                throw {
                    msg: `DATE SHOULD BE GREATER THAN TODAY`
                }
            }
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async readTodo(req, res) {
        try {
            const result = await Todo
            .findAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async searchTodoById(req, res) {
        const index = req.params.id

        try {
            const result = await Todo
            .findByPk({
                where: {
                    id: index
                }
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error)   
        }
    }

    static async updateTodo(req, res) {
        const index = req.params.id
        const { title,description, status, due_date } = req.body

        try {
            const result = await Todo.update({
                title,
                description,
                status,
                due_date
            }, {
                where: {
                    id: index
                },
                returning: true
            })
            const currentTime = new Date()
            if(due_date < currentTime){
                throw {
                    msg: `DATE SHOULD BE GREATER THAN TODAY`
                }
            }
            res.status(200).json(result[1][0])
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static async changeStatus(req, res) {
        const index = req.params.id
        const { status } = req.body

        try {
            const result = await Todo
            .update({
                status
            }, {
                where: {
                    id: index
                },
                returning: true
            })
            res.status(200).json(result[1][0])
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static async deleteTodo(req, res) {
        const index = req.params.id

        try {
            const data = await Todo
            .findByPk(index)
            const result = await Todo
            .destroy({
                where: {
                    id: index
                },
                returning: true
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = Controller;