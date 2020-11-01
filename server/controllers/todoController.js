const Todo = require('../models').Todo

class ToDoController {
  // POST /todos
  static createTodo(req, res, next) {
    const { title, description, status, due_date } = req.body
    const UserId = req.loggedInUser.id
    Todo
      .create({ title, description, status, due_date, UserId })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET /todos
  static findAll(req, res, next) {
    const UserId = req.loggedInUser.id
    Todo
      .findAll({
        where: {
          UserId: UserId
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  // GET /todos/:id
  static findOneTodo(req, res, next) {
    const UserId = req.loggedInUser.id
    Todo
      .findOne({
        where: {
          id: req.params.id,
          UserId: UserId
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  // PUT /todos/:id
  static updateTodo(req, res, next) {
    const UserId = req.loggedInUser.id
    const { title, description, status, due_date } = req.body
    Todo
      .update({
        title, description, status, due_date 
      }, {
        where: {
          id: req.params.id,
          UserId: UserId
        },
        returning: true
      })
      .then(data => {
        if (data[0] === 0) {
          throw { name: 'Update failed!'}
        }
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  // PATCH /todos/:id
  static updateTodoStatus(req, res, next) {
    const UserId = req.loggedInUser.id
    const { status } = req.body
    Todo
      .update({
        status
      }, {
        where: {
          id: req.params.id,
          UserId: UserId
        },
        returning: true
      })
      .then(data => {
        if (data[0] === 0) {
          throw { name: 'Update failed!'}
        }
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  // DELETE /todos/:id
  static deleteTodo(req, res, next) {
    const UserId = req.loggedInUser.id
    Todo
      .destroy({
        where: {
          id: req.params.id,
          UserId: UserId
        }
      })
      .then(data => {
        res.status(200).json({message: 'todo success to delete'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ToDoController