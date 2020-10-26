const { User, Todo } = require('../models/index')

class Controller {
    static async create(req, res){
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }

            let todo = await Todo.create(payload);

            res.status(201).json({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                status: todo.status,
                due_date: todo.dues_date
            });
            
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error:error.message})
            }
        }
    }

    static async showTodos(req, res){
        try {
            let data = await Todo.findAll();
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    static async showTodo(req, res){
        try {
            let data = await Todo.findByPk(req.params.id);
            if(data){
                res.status(200).json(data)
            } else {
                throw { error: 'Data not found' };
            }
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static async update(req, res){
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: new Date(req.body.due_date)
            
            }
            let todo = await Todo.update(payload, {where: {id: req.params.id}, returning:true })
            res.status(200).json({
                id: todo[1][0].id,
                title: todo[1][0].title,
                description: todo[1][0].description,
                status: todo[1][0].status,
                due_date: new Date(todo[1][0].dues_date)
            });
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({error: error.message})
            } else if(error.name === "TypeError") {
                res.status(404).json({error:"Not Found"})
            } else {
                res.status(500).json({error})
            }
        }
    }

    static async patchTodo(req, res){
        try {

            const payload = {
                status: req.body.status
            }
            let todo = await Todo.update(payload, { where: {id: req.params.id}, returning:true });
            res.status(200).json({
                id: todo[1][0].id,
                title: todo[1][0].title,
                description: todo[1][0].description,
                status: todo[1][0].status,
                due_date: new Date(todo[1][0].dues_date)
            });
        } catch (error){
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({error: error.message})
            } else if(error.name === "TypeError") {
                res.status(404).json({error:"Not Found"})
            } else {
                res.status(500).json({error})
            }
        }
    }

    static async delete(req, res){
        try {
            let todo = await Todo.destroy({where:{id: req.params.id}})
            res.status(200).json({message: "todo success to delete"})
        } catch (error){
            if(error.name === "TypeError") {
                res.status(404).json({error:"Not Found"})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    }
}
module.exports = Controller