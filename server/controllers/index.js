const { Todo } = require("../models")

class Controller {
  static getTodo(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static postTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.create({ title, description, status, due_date })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.name = "SequelizeValidationError") {
          return res.status(400).json(err.message)
        }
        res.status(500).json(err.message)
      })
  }

  static getTodoById(req, res) {
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          return res.status(200).json(data)
        }
        res.status(404).json({ error: "Id not found" })
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static putTodoById(req, res) {
    const { title, description, status, due_date } = req.body

    Todo.update({ title, description, status, due_date }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        if (data[0] === 1) {
          return res.status(200).json(data[1][0])
        }
        res.status(404).json({ error: "Id not found" })
      })
      .catch(err => {
        if (err.name = "SequelizeValidationError") {
          return res.status(400).json(err.message)
        }
        res.status(500).json(err.message)
      })
  }

  static patchTodoById(req, res) {
    const { status } = req.body

    Todo.update({ status }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        if (data) {
          return res.status(200).json(data[1][0])
        }
        res.status(404).json({ error: "Id not found" })
      })
      .catch(err => {
        if (err.name = "SequelizeValidationError") {
          return res.status(400).json(err.message)
        }
        res.status(500).json(err.message)
      })
  }

  static deleteTodoById(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(data => {
        if (data) {
          return res.status(201).json({ message: "todo success to delete" })
        }
        res.status(404).json({ error: "Id not ferroround" })
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

}

module.exports = Controller