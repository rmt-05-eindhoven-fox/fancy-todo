const { Todo } = require('../models')

class Controller {
    static todos(req, res){
        Todo.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static postTodo(req, res){
        const { title, description, status, due_date } = req.body 
        let newTodo = {
            title,
            description,
            status,
            due_date
        }
        Todo.create(newTodo)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.name === 'SequelizeValidationError'){
                const listErrors = err.errors.map(error=>{
                return error.message
                })
                res.status(500).json({error: listErrors})
            }
            res.status(500).json(err)
        })
    }

    static findById(req, res){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            if(!data){
                throw {error : 'id not found'}
            }
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(404).json(err)
        })
    }

    static putTodo(req, res){
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        const updateTodo = {
            title,
            description,
            status,
            due_date
        }
        Todo.update(updateTodo, {
            where:{id},
            returning : true
        })
        .then(data=>{
            if(data[0] === 0){
                throw {error:'id not found'}
            }else{
                res.status(200).json(data[1][0])
            }
        })
        .catch(err=>{
            if(err.error){
                res.status(404).json({error: err.error})
            }
            if(err.name === 'SequelizeValidationError'){
                const errors = err.errors.map(error=>{
                    return error.message
                })
                res.status(400).json({errors})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static patchTodo(req, res){
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
            if(data[0] === 0){
                throw {error:'id not found'}
            }else{
                res.status(200).json(data[1][0])
            }
        })
        .catch(err=>{
            if(err.error){
                res.status(404).json({error: err.error})
            }
            if(err.name === 'SequelizeValidationError'){
                const errors = err.errors.map(error=>{
                    return error.message
                })
                res.status(400).json({errors})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req, res){
        const id = req.params.id
        Todo.destroy({where:{id}})
        .then(data=>{
            if(!data){
                throw {error:'id not found'}
            }else{
                res.status(200).json({message: 'todo success to delete'})
            }
        })
        .catch(err=>{
            if(err.error){
                res.status(404).json({error: err.error})
            }else{
                res.status(500).json(err)
            }
        })
    }
}

module.exports = Controller