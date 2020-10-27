const { Todo } = require("../models")

class TodoController {
  static getTodo(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.loggedInUser.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static postTodo(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedInUser.id
    }
    Todo.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    Todo.findByPk(req.params.id)
      .then(data => {

        res.status(200).json(data)

      })
      .catch(err => {
        next(err)
      })
  }

  static putTodoById(req, res, next) {
    const { title, description, status, due_date } = req.body

    Todo.update({ title, description, status, due_date }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static patchTodoById(req, res, next) {
    const { status } = req.body

    Todo.update({ status }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodoById(req, res, next) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json({ message: "todo success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TodoController