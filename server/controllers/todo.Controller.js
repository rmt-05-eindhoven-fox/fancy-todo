const { ToDo } = require("../models/index")
class TodoController {

    static async create(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            console.log(req.body, "<<< ini req body controller");
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
            console.log(req.params.id, "<<< ini id dari params ");
            let todo = await ToDo.findByPk(id)
            console.log(todo, "<<< todo findByPk");
            res.status(200).json(todo)
        } catch (err) {
            console.log(err, ">>> ERROR FIND BY ID");
            next(err)
        }
    }

    static async updateAll(req, res, next) {
        try {
           console.log(req.params.id, "req.params.id");
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
            // let { status } = req.body
            let todo = await ToDo.update({status : true}, { where: { id: req.params.id } , returning : true})
            console.log(todo, ">>> ini dari update status")
            res.status(200).json(todo)
            // if (todo) {
            //     todo.status = false
            //     // todo.update()
            //     res.status(200).json(todo)
            // } else {
            //     res.status(404)
        } catch (err) {
            console.log(err, '>>> ERROR DATA UPDATE')
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            console.log(id, "<<< id controller");
            let todo = await ToDo.destroy({
                where: { id : id }, returning : true
            })
            res.status(200).json({msg: "todo success to delete"})
        } catch (err) {
            console.log(err, '>>> ERROR DATA DELETE')
            next(err)
        }
    }

}

module.exports = TodoController