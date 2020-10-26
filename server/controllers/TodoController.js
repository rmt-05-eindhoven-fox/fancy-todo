const { Todo } = require('../models/index')

class TodoController {
  static async createTodo(req, res) {
    const { title, description, status, due_date } = req.body
    const rawTodo = {
      title,
      description,
      status,
      due_date
    }
    try {
      const result = await Todo.create(rawTodo)
      res.status(201).json(result)
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => {
          return err.message
        }).join(', ')
        res.status(400).send(errors)
      } else {
        res.status(500).json(error)
      }
    }
  }
  
  static async getAllTodos(req, res) {
    try {
      const todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }  
  }  

  static async getTodo(req, res) {
    const id = +req.params.id
    try {
      const todo = await Todo.findByPk(id)
      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async updateTodo(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    const rawTodo = {
      title,
      description,
      status,
      due_date
    }
    const options = {
      where: {
        id: id
      },
      returning: true
    }
    try {
      const result = await Todo.update(rawTodo, options)
      if (result[0] === 0) {
        res.status(404).send('not found')
      } else {
        res.status(200).json(result[1][0])
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => {
          return err.message
        }).join(', ')
        res.status(400).send(errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async patchTodo(req, res) {
    const id = +req.params.id
    const { status } = req.body
    const rawTodo = {
      status
    }
    const options = {
      where: {
        id: id
      },
      returning: true
    }
    try {
      const result = await Todo.update(rawTodo, options)
      if (result[0] === 0) {
        res.status(404).send('not found')
      } else {
        res.status(200).json(result[1][0])
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => {
          return err.message
        }).join(', ')
        res.status(400).send(errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async deleteTodo(req, res) {
    const id = +req.params.id
    const options = {
      where: {
        id: id
      }
    }
    try {
      const result = await Todo.destroy(options)
      console.log(result);
      if (result === 0) {
        res.status(404).send('not found')
      } else {
        res.status(200).send('todo success to delete')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TodoController