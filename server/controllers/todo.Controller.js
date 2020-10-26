const { ToDo } = require("../models/index")
class TodoController {

    static async create(req, res) {
        const { title, description, status, due_date } = req.body
        try {
            let todo = await ToDo.create({ title, description, status, due_date })
            res.status(201).json(todo)
        } catch (err) {
            console.log(err, '>>>> ERROR Create')
            res.status(500).json(err)
        }
    }

    static async findAll(req, res) {
        try {
            let todo = await ToDo.findAll()
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, '>>> ERROR FIND ALL')
            res.status(500).json(err)
        }

    }

    static async updateAll(req, res) {
        try {
            let { title, description, status, due_date } = req.body
            console.log(req.body, ">>> req body")
            let todo = await ToDo.update({ title, description, status, due_date }, {
                where: { id: req.params.id }
            })
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, '>>> ERROR DATA UPDATE')
            res.status(500).json(err)
        }
    }

    static async updateStatus(req, res) { 
        try { 
            let {status} = req.body
            let todo = await ToDo.findOne({where :{id: req.params.id}})
            console.log(todo)
            if(todo) { 
                todo.status = status
                todo.save()
                res.status(200).json(todo)
            } else { 
                res.status(404)
            }
        } catch(err) { 
            console.log(err, '>>> ERROR DATA UPDATE')
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            let todo = ToDo.destroy({
                where: { id }
            })
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, '>>> ERROR DATA DELETE')
            res.status(500).json(err)
        }
    }

}

module.exports = TodoController