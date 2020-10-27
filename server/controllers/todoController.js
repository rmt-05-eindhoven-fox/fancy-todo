const Todo = require('../models').Todo

class ToDoController {
  // static async findAll1(req, res) {
  //   try {
  //     const todos = await Todo.findAll()
  //     res.status(200).json(todos)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }

  // POST /todos
  static createTodo(req, res) {
    const { title, description, status, due_date } = req.body
    const UserId = req.loggedInUser.id
    Todo
      .create({ title, description, status, due_date, UserId })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          let errors = err.errors.map(el => el.message)
          res.status(400).json(errors.join(', '))
        } else {
          res.status(500).json(err)
        }
      })
  }
  // GET /todos
  static findAll(req, res) {
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
        res.status(500).json(err)
      })
  }
  // GET /todos/:id
  static findOneTodo(req, res) {
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
        res.status(404).json(err)
      })
  }
  // PUT /todos/:id
  static updateTodo(req, res) {
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
        res.status(500).json(err)
      })
  }
  // PATCH /todos/:id
  static updateTodoStatus(req, res) {
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
        res.status(500).json(err)
      })
  }
  // DELETE /todos/:id
  static deleteTodo(req, res) {
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
        res.status(500).json(err)
      })
  }
}

module.exports = ToDoController