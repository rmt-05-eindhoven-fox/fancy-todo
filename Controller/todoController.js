const { Todo } = require('../models/index');

class Controller {
    static async create (req, res, next) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_status,
            UserId: req.loginUser.id
        };

        try {
            const todos = await Todo.create(todo);

            const data = {
                id: todos.id,
                title: todos.title,
                description: todos.description,
                status: todos.status,
                due_date: todos.due_date,
                UserId: todos.UserId
            }

            res.status(201).json(data);
        } catch (err) {
            next(err);
            // if (err.name === 'SequelizeValidationError') {
            //     if (err.errors.length > 0) {
            //         let errors = err.errors.map((error) => {
            //             return error.message;
            //         });
            //         res.status(400).json({ errors });
            //     }
            // }
            // else {
            //     console.log(err);
            //     res.status(500).json(err);
            // }
        }
    }

    static async showAll (req, res, next) {
        const userId = req.loginUser.id;

        try {
            const todos = await Todo.findAll({
                attributes: {
                    exclude: ['createdAt, updatedAt']
                },
                where: {
                    UserId: userId
                }
            });

            res.status(200).json(todos);

        } catch (err) {
            console.log(err);
            next(err);           
        }
    }

    static async showOne (req, res, next) {
        let idParams = +req.params.id;

        try {
            const todos = await Todo.findByPk(idParams, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (todos[0] === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json(todos);
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateOne (req, res, next) {
        const idParams = +req.params.id;
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_status
        }

        try {
            const todos = await Todo.update(todo, {
                attributes: {
                    exclude: ['createdAt, updatedAt']
                },
                where: {
                    id: idParams
                }
            });
            if (todos[0] === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json(todos[1][0]);
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateStatus (req, res, next) {
        const idParams = +req.params.id;
        const todo = {
            status: req.body.status
        }

        try {
            const todos = await Todo.update(todo,
                {
                    where: {
                        id: idParams
                    },
                    returning: ['id', 'title', 'description', 'status', 'due_date']
                })

            if (todos[0] === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json(todos[1][0]);
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteOne (req, res, next) {
        let idParams = +req.params.id;

        try {
            const todos = await Todo.destroy({
                where: {
                    id: idParams
                }
            });

            if (todos === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json({
                    message: 'todo success to delete'
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;