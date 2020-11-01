const { Todo } = require('../models');

class TodoController {
    static async listTodo (req, res, next) {
        // console.log(req.loggedInUser)
        const UserId = req.loggedInUser.id;
        try { 
            const data = await Todo.findAll({
                where: {
                    UserId
                }
            })
            res.status(200).json(data)
        } catch (err){
            next(err)
        }
    }

    static async postAdd(req,res, next){
        let { title, description, status, due_date } = req.body;
        
        const newTodo = {
            title, description, status:false, due_date, UserId: req.loggedInUser.id
        }
        try { 
            const data = await Todo.create(newTodo)
            res.status(201).json(data)
        } catch (err){
            next(err)
        }
    }

    static async getTodoByID(req,res, next){
        const UserId = req.loggedInUser.id;
        const Id = req.params.id;
        try { 
            const data = await Todo.findByPk(Id, {
                where: {
                    UserId
                }
            })
            res.status(202).json(data)
        } catch (err){
            next(err)
        }
    }

    static async update(req,res, next){
        const Id = req.params.id;
        let { title, description, status, due_date } = req.body;
        
        const updateTodo = {
            title, description, status, due_date
        }

        try { 
            const data = await Todo.update(updateTodo, 
                { where: { id: Id }, returning: true })
            res.status(200).json(data[1][0])
        } catch (err){
            next(err)
        }
    }

    static async updateStatus(req,res, next){
        const Id = req.params.id;
        let { status } = req.body;
        
        const updateStatus = {
            status
        }

        try { 
            const data = await Todo.update(updateStatus, 
                { where: { id: Id }, returning: true })
            res.status(200).json(data[1][0])
        } catch (err){
            next(err)
        }
        // const Id = req.params.id;
        // let { status } = req.body;
        
        // const updateStatus = {
        //    status
        // }
        // try { 
        //     const data = await Todo.update(updateStatus, 
        //         { where: { id: Id }, returning: true })
        //     res.status(200).json(data[1][0])
        // } catch (err){
        //     next(err)
        // }

        // try {
        //     let { status } = req.body
        //     let todo = await Todo.findOne({ where: { id: req.params.id } })
        //     console.log(todo)
        //     if (todo) {
        //         todo.status = status
        //         todo.save()
        //         res.status(200).json(todo)
        //     } else {
        //         res.status(404)
        //     }
        // } catch (err) {
        //     console.log(err, '>>> ERROR DATA UPDATE')
        //     next(err)
        // }
    }

    static async delete(req, res, next){
        const Id = req.params.id;

        try { 
            const data = await Todo.destroy({ 
                where: 
                    { id: Id }
            })
            res.status(200).json({
                message: 'todo success to delete'
            })
        } catch (err){
            next(err)
        }
    }

}

module.exports = TodoController;