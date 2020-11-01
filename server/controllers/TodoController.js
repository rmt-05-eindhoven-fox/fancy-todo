const { User, Todo } = require('../models/index')
const MailGun = require('../API/mailgun')

class Controller {
    static async create(req, res, next){
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.loggedIn.id
            }
            let todo = await Todo.create(payload);
            const data = {
                from: `Rama Ibrahim's Fancy To-do app <maulanarama@gmail.com>`,
                to: req.loggedIn.email,
                subject: `You've added a new list!`,
                text: `${payload.title} has been added to your todo list, go checkout at http://localhost:3000/todos`
            };
            MailGun(data);
            res.status(201).json({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                status: todo.status,
                due_date: todo.due_date
            });
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                next({message: error.message, status: 400})
            } else {
                next(error)
            }
        }
    }

    static async showTodos(req, res, next){
        try {
            let data = await Todo.findAll({where:{UserId:req.loggedIn.id}});
            res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }

    static async showTodo(req, res, next){
        try {
            let data = await Todo.findOne({where:{id: req.params.id, UserId: req.loggedIn.id}})
            if(data){
                res.status(200).json(data)
            } else {
                throw { message: 'Data not found', status: 404 };
            }
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next){
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
                due_date: todo[1][0].dues_date
            });
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                next({message: error.message, status: 400})
            } else if(error.name === "TypeError") {
                next({message:"Not Found", status: 404})
            } else {
                next(error)
            }
        }
    }

    static async patchTodo(req, res, next){
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
                next({message: error.message, status: 400})
            } else if(error.name === "TypeError") {
                next({message:"Not Found", status: 404})
            } else {
                next(error)
            }
        }
    }

    static async delete(req, res, next){
        try {
            let todo = await Todo.destroy({where:{id: req.params.id}})
            res.status(200).json({message: "todo success to delete"})
        } catch (error){
            if(error.name === "TypeError") {
                next({message:"Not Found", status: 404})
            } else {
                next(error)
            }
        }
    }
}
module.exports = Controller