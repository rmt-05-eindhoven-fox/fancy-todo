
const { Todo } = require("../models/index")

class TodoController {
    static add (req,res) {
        const { title, description, status, due_date } = req.body
        Todo.create(req.body, {returning: true})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static list (req,res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
    static edit (req, res) {
        const { title, description, status, due_date } = req.body
        // console.log(req.body)
        Todo.update({
            title,
            description,
            status,
            due_date
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static findOne(req, res){
        Todo.findOne({where :{id: req.params.id}}, {returning: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static update(req, res){
        const { status } = req.body
        // console.log(req.body)
        Todo.update({
            status
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static delete(req,res){
        Todo.destroy({where:{id: req.params.id}})
        .then(() => {
            res.status(204).send("todo success to delete")
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController