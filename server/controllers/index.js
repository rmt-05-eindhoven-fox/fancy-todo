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
        res.status(400).json(err.message)
      })
  }

  static getTodoById(req, res) {
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          return res.status(200).json(data)
        }
        res.status(404).json(err.message)
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

  static putTodoById(req, res) {
    const { title, description, status, due_date } = req.body

    Todo.update({ title, description, status, due_date }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(201).json(data[1][0])
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

  static patchTodoById(req, res) {
    const { status } = req.body

    Todo.update({ status }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(201).json(data[1][0])
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

  static deleteTodoById(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

}

module.exports = Controller