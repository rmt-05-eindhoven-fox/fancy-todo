const { Todo } = require('../models')

class TodoController{
    static getTodo(req, res, next){
        // console.log("masuk", "<<< GetTodo");
        const UserId = req.loggedInUser.id
        console.log(UserId);
        Todo.findAll({
            where: {
                UserId
            }
        })
            .then((dataTodo) => {
                console.log(dataTodo);
                res.status(200).json({dataTodo})
            })
            .catch((err) => {
                next(err)
            })
    }
    
    static postTodo(req, res, next){
        const UserId = req.loggedInUser.id
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date, 
            UserId
        })
            .then((dataTodo) => {
                res.status(201).json({dataTodo})
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static findIdTodo(req, res){
        const { id } = req.params
        Todo.findByPk(id)
            .then((dataTodo) => {
                res.status(200).json(dataTodo)
            })
            .catch((err) => {
                next(err)
            })
    }

    static putTodo(req, res){
        const { title, description, status, due_date } = req.body
        console.log(req.body);
        Todo.update({
            title, description, status, due_date
        }, {
            where: { 
                id: req.params.id
            }
        })
            .then(dataTodo => {
                res.status(200).json(dataTodo)
            })
            .catch((err) => {
                next(err)
            })
    }

    static patchTodo(req, res){
        const { status } = req.body
        Todo.update({
            status
        }, {
            where: { id: req.params.id }
        })
            .then((dataTodo) => {
                res.status(200).json(dataTodo)
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((dataTodo) => {
                res.status(200).json({ 
                    msg: 'todo success to delete'
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = TodoController 