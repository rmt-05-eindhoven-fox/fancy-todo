const { Todo } = require('../models/index');

class Controller {
    static async create (req, res) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_status
        }

        try {
            const todos = await Todo.create(todo);

            const data = {
                id: todos.id,
                title: todos.title,
                description: todos.description,
                status: todos.status,
                due_date: todos.due_date
            }

            res.status(201).json(data);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map((error) => {
                        return error.message;
                    });
                    res.status(400).json({ errors });
                }
            }
            else {
                res.status(500).json(err);
            }
        }
    }

    static async showAll (req, res) {
        try {
            const todos = await Todo.findAll({
                attributes: {
                    exclude: ['createdAt, updatedAt']
                }
            });
            res.status(200).json(todos);
        } catch (err) {
            res.status(500).json(err);            
        }
    }

    static async showOne (req, res) {
        let idParams = +req.params.id;

        try {
            const todos = await Todo.findByPk(idParams, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (todos[0] === 0) {
                res.status(404).json({
                    message: 'not found'
                });
            }
            else {
                res.status(200).json(todos);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async updateOne (req, res) {
        let idParams = +req.params.id;
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_status
        }

        try {
            const todos = await Todo.update(todo, {
                where: {
                    id: idParams
                },
                returning: true
            });
            if (todos[0] === 0) {
                res.status(404).json({
                    message: 'not found'
                });
            }
            else {
                res.status(200).json(todos[1][0]);
            }
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map((error) => {
                        return error.message;
                    });
                    res.status(400).json({ errors });
                }
            }
            else {
                res.status(500).json(err);
            }
        }
    }

    static async updateStatus (req, res) {
        const idParams = +req.params.id;
        const todo = {
            status: req.body.status
        }

        try {
            const todos = await Todo.update({
                todo
            }, {
                where: {
                    id: idParams
                },
                returning: ['id', 'title', 'description', 'status', 'due_date']
            })

            if (todos[0] === 0) {
                res.status(404).json({
                    message: 'not found'
                });
            }
            else {
                res.status(200).json(todos[1][0]);
            }
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                if (err.errors.length > 0) {
                    let errors = err.errors.map((error) => {
                        return error.message;
                    });
                    res.status(400).json({ errors });
                }
            }
            else {
                res.status(500).json(err);
            }
        }
    }

    static async deleteOne (req, res) {
        let idParams = +req.params.id;

        try {
            const todos = await Todo.destroy({
                where: {
                    id: idParams
                }
            });

            if (todos === 0) {
                res.status(404).json({
                    message: 'not found'
                });
            }
            else {
                res.status(200).json({
                    message: 'todo success to delete'
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = Controller;