const { Todo, User } = require('../models/index')

class TodoController {
  static async createTodo(req, res, next) {
    const userId = req.userLoggedIn.id
    const { title, description, status, due_date } = req.body
    const rawTodo = {
      title,
      description,
      status,
      due_date,
      userId
    }
    try {
      const result = await Todo.create(rawTodo)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
  
  static async getAllTodos(req, res, next) {
    const userId = req.userLoggedIn.id
    try {
      const todos = await Todo.findAll({ where: { userId }, order: [['id', 'DESC']]})
      res.status(200).json(todos)
    } catch (error) {
      next(err)
    }  
  }  

  static async getTodo(req, res, next) {
    const id = +req.params.id
    try {
      const todo = await Todo.findByPk(id)
      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }

  static async updateTodo(req, res, next) {
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
        throw { msg: 'todo not found', status: 404 }
      } else {
        res.status(200).json(result[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async patchTodo(req, res, next) {
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
        throw { msg: 'todo not found', status: 404 }
      } else {
        res.status(200).json(result[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTodo(req, res, next) {
    const id = +req.params.id
    const options = {
      where: {
        id: id
      },
      returning: true
    }
    try {
      const result = await Todo.destroy(options)
      console.log(result);
      if (result === 0) {
        throw { msg: 'todo not found', status: 404 }
      } else {
        res.status(200).json({ message: 'todo success to delete' })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController