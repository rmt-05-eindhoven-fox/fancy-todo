const {Todo} = require('../models/index');

class TodosController {
    static async addTodos(req, res) {
        try {
            const { title, description, status, due_date } = req.body
            const newTodo = await Todo.create({
                title,
                description,
                status,
                due_date
            });
            res.status(201).json(newTodo);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map(error => {
                        return error.message
                    });
                    res.status(400).json({errors});
                }
            } else {
                res.status(500).json({
                    err: 'Internal server error'
                });
            }
        }
    }
    static async list(req, res) {
        try {
            const todos = await Todo.findAll();
            res.status(200).json(todos);
        } catch (err) {
            res.status(500).json({
                err: 'Internal server error'
            });
        }
    }
    static async findTodos(req, res) {
        try {
            let id = req.params.id;
            const todo = await Todo.findByPk(id);
            res.status(200).json(todo);
        } catch (err) {
            res.status(404).json({
                err: 'Error Not Found'
            });
        }
    }
    static async updateTodos(req, res) {
        try {
            let id = req.params.id;
            const { title, description, status, due_date } = req.body;
            const updateTodo = await Todo.update({
                title,
                description,
                status,
                due_date
            }, {
                where: {id},
                returning: true
            });
            res.status(201).json(updateTodo[1][0]);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map(error => {
                        return error.message;
                    });
                    res.status(400).json({errors});
                }
            } else {
                res.status(500).json({
                    err: 'Internal server error'
                });
            }
        }
    }
    static async updateStatusTodos(req, res) {
        try {
            let id = req.params.id;
            const {status} = req.body;
            const updateTodo = await Todo.update({
                status
            }, {
                where: {id},
                returning: true
            });
            res.status(201).json(updateTodo[1][0]);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map(error => {
                        return error.message;
                    });
                    res.status(400).json({errors});
                }
            } else {
                res.status(500).json({
                    err: 'Internal server error'
                });
            }
        }
    }
    static async deleteTodos(req, res) {
        try {
            let id = req.params.id;
            const todo = await Todo.destroy({
                where: {id}
            });
            res.status(200).json({
                message: 'Task Deleted Successfully'
            });
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map(error => {
                        return error.message
                    });
                    res.status(400).json({errors})
                }
            } else {
                res.status(500).json({
                    err: 'Internal server error'
                });
            }
        }
    }
    
}

module.exports = TodosController;