const { ToDo } = require("../models/index")
class TodoController {

    static async create(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const id = req.loggedInUser.id
            let todo = await ToDo.create({ title, description, status, due_date, UserId: id })
            res.status(201).json(todo)
        } catch (err) {
            console.log(err, '>>>> ERROR Create')
            next(err)
        }
    }



    static async findAll(req, res, next) {
        try {
            let todo = await ToDo.findAll()
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, '>>> ERROR FIND ALL')
            next(err)
        }

    }


    static async findById(req, res, next) {
        try {
            const { id } = req.params
            let todo = await ToDo.findByPk(id)
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, ">>> ERROR FIND BY ID");
            next(err)
        }
    }

    static async updateAll(req, res, next) {
        try {
            let { title, description, status, due_date } = req.body
            console.log(req.body, ">>> req body")
            let todo = await ToDo.update({ title, description, status, due_date }, {
                where: { id: req.params.id }
            })
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, '>>> ERROR DATA UPDATE')
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            let { status } = req.body
            let todo = await ToDo.findOne({ where: { id: req.params.id } })
            console.log(todo)
            if (todo) {
                todo.status = status
                todo.save()
                res.status(200).json(todo)
            } else {
                res.status(404)
            }
        } catch (err) {
            console.log(err, '>>> ERROR DATA UPDATE')
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            let todo = await ToDo.destroy({
                where: { id }, returning : true
            })
            res.status(200).json({msg: "todo success to delete"})
        } catch (err) {
            console.log(err, '>>> ERROR DATA DELETE')
            next(err)
        }
    }

}

module.exports = TodoController