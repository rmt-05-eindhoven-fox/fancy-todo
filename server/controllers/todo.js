const { Todo } = require('../models')

class TodoController{
    static post(req, res){
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date
        })
            .then((dataTodo) => {
                res.status(201).json({ dataTodo })
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }

    static get(req, res){
        Todo.findAll()
            .then((dataTodo) => {
                res.status(200).json({ dataTodo })
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }

    static findId(req, res){
        const { id } = req.params
        Todo.findByPk(id)
            .then((dataTodo) => {
                res.status(200).json({ dataTodo })
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }

    static put(req, res){
        const { title, description, status, due_date } = req.body
        Todo.update({
            title, description, status, due_date
        }, {
            where: { id: req.params.id}
        })
            .then((dataTodo) => {
                res.status(200).json({ dataTodo })
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }

    static patch(req, res){
        const { status } = req.body
        Todo.update({
            status
        }, {
            where: { id: req.params.id }
        })
            .then((dataTodo) => {
                res.status(200).json({ dataTodo })
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }

    static delete(req, res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((dataTodo) => {
                res.status(200).json({ msg: 'todo success to delete'})
            })
            .catch((err) => {
                res.status(400).json({
                    msg: "Invalid requests"
                })
            })
    }
}

module.exports = TodoController