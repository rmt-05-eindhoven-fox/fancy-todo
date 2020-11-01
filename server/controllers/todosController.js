const { Todo } = require("../models/index.js")

class TodoController {

    static createTodo(req, res, next){
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
            next(err)
        })
    }


    static findAllTodo(req, res, next){
        console.log('MASUK')
        const userId = req.loggedInUser.id
        console.log({userId})
        Todo.findAll({
            where: {UserId: userId}
        })
        .then( todo => {
            // console.log({todo})
            res.status(200).json(todo)
        })
        .catch(err => {
            console.log({error})
            next(err)
        })
    }

    static getTodoById(req, res, next){
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
            next(err)
        })
    }

    static updateTodo(req, res, next){
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
            // res.status(500).json(err)
            next(err)
        })
    }
    static updateStatus(req,res,next) {
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
                    name: 'update failed', status:400
                }
            }
            res.status(201).json(data[1][0])
        })
        .catch(err => {
            // res.status(500).json(err)
            next(err)
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
            
            res.status(200).json('todo success to delete')
        })
        .catch(err => {
            // res.status(404).json(err)
            next(err)
        })
    }
}

module.exports = TodoController