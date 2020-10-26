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
}
module.exports = Controller