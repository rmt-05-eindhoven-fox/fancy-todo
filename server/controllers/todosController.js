const { Todo } = require("../models/index.js")

class TodoController {

    static createTodo(req, res){
        const { title, description, status, due_date} = req.body
        Todo.create({
            title,
            description,
            status,
            due_date
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
        console.log(userId)
        Todo.findAll({
            where: userId
        })
        .then( todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTOdoById(req, res){
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
                    error: `data id ke ${+ req.params.id} tidak ditemukan`
                }
            }
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            res.status(404).json(err)
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
    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then( data => {
            if(data === 0){
                throw{
                    error: `delete gagal. data id ke ${+ req.params.id} tidak ditemukan`
                }
            }
            res.status(200).json('todo success to delete id ke-')
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
}

module.exports = TodoController