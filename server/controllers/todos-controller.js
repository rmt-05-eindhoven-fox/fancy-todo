const { Todo } = require('../models')

class Controller {
    static todos(req, res, next){
        const { id } = req.loggedInUser
        Todo.findAll({
            where: {
                UserId: id
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static postTodo(req, res, next){
        const { id } = req.loggedInUser
        const { title, description, status, due_date } = req.body 
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId : id
        }
        Todo.create(newTodo)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findById(req, res, next){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static putTodo(req, res, next){
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        const updateTodo = {
            title,
            description,
            status,
            due_date,
        }
        Todo.update(updateTodo, {
            where:{id},
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[1][0])
        })
        .catch(err=>{
            next(err)
        })
    }

    static patchTodo(req, res, next){
        const id = req.params.id
        const { status } = req.body
        const updateStatus = {
            status
        }
        Todo.update(updateStatus, {
            where:{id},
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[1][0])
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteTodo(req, res, next){
        const id = req.params.id
        Todo.destroy({where:{id}})
        .then(data=>{
            res.status(200).json({message: 'todo success to delete'})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller