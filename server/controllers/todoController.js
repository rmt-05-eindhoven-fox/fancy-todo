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
    console.log({ title, description, status, due_date })
    Todo
      .create({ title, description, status, due_date })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  // GET /todos
  static findAll(req, res) {
    Todo
      .findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  // GET /todos/:id
  static findOneTodo(req, res) {
    Todo
      .findByPk(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }
  // PUT /todos/:id
  static updateTodo(req, res) {
    const { title, description, status, due_date } = req.body
    Todo
      .update({
        title, description, status, due_date 
      }, {
        where: {
          id: req.params.id
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
    const { status } = req.body
    Todo
      .update({
        status
      }, {
        where: {
          id: req.params.id
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
    Todo
      .destroy({
        where: {
          id: req.params.id
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