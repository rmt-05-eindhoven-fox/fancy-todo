const { Todo } = require('../models')

class Controller {
    static createTodo(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo
        .create({
            title,
            description,
            status,
            due_date,
            UserId: +req.isSignedIn.userId
            })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err);
        })
    }

    static readTodo(req, res, next) {
        const userId = +req.isSignedIn.userId
        console.log(userId)
        Todo
        .findAll({
            where: {
                UserId: userId
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static searchTodoByUserId(req, res, next) {
        const userId = req.isSignedIn.userId
        const id = req.params.id

        Todo
        .findAll({
            where: {
                id,
                UserId: userId
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)   
        })
    }

    static updateTodo(req, res, next) {
        const index = req.params.id
        const UserId = req.isSignedIn.userId
        const { title, description, status, due_date } = req.body

        Todo
        .update({
            title,
            description,
            status,
            due_date,
            UserId
        }, {
            where: {
                id: index
            },
            returning: true
        })
        .then(result => {
            console.log('berhasil')
            res.status(200).json(result[1][0])
        })
        .catch (err => {
            next(err)
        })
    }

    static changeStatus(req, res, next) {
        const index = req.params.id
        const { status } = req.body
        Todo
        .update({
            status
        }, {
            where: {
            id: index
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1][0])
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        const index = req.params.id
        let data = ''

        Todo
        .findByPk(index)
        .then(result => {
            data = result
            return Todo.destroy({
                where: {
                    id: index
                }
            })
        })
        .then(result => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller;