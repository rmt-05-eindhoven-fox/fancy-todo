const { Todo } = require("../models/index.js")

class TodoController {

    static createTodo(req, res){
        const { title, description, status, due_date } = req.body
        const UserId = req.loggedInUser.id
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId
        },{
            returning:true
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }


    static findAllTodo(req, res){
        const userId = req.loggedInUser.id
        Todo.findAll({
            where: {UserId: userId}
        })
        .then( todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTodoById(req, res){
        Todo.findOne({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then( todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static updateTodo(req, res){
        const { title, description, status, due_date} = req.body
        Todo.update({
            title,
            description,
            status,
            due_date
        }, 
        {
            where: {
                id: +req.params.id
            },
            returning: true
        }
        )
        .then(data => {
            if(data[0] !== 1){
                throw{
                    error: `nothing to update`
                }
            }
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updateStatus(req,res) {
        Todo.update({
            status : req.body.status
        }, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            if(data[0] !== 1){
                throw{
                    name: 'update failed'
                }
            }
            res.status(201).json(data[1][0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteTodo(req, res, next){
        Todo.destroy({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then( data => {
            // if(data === 0){
            //     throw{
            //         error: `data id ke ${+ req.params.id} tidak ditemukan`
            //     }
            // }
            res.status(200).json('todo success to delete')
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController