const { Todo, User } = require('../models/index')

class TodoController {
  static async findAll(req, res, next) {
    try {
      let list = await Todo.findAll({
        where: {
          UserId: req.userData.id
        }
      })
      list = list.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: todo.due_date,
          UserId: todo.UserId
        }
      })
      res.status(200).json({ list })
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const { title, description, status, due_date } = req.body

      const todoObj = { title, description, status, due_date, UserId: req.userData.id }

      const todo = await Todo.create(todoObj, {
        individualHooks: true
      })
        res.status(201).json ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: todo.due_date,
          UserId: todo.UserId
        })
    } catch (err) {
      next(err)
    }
  }

  static async findId(req, res, next) {
    try {
      const { id } = req.params
      const todo = await Todo.findByPk(id)

      if(!todo) throw {
        message: 'Error not found', statusCode: 404
      }
      res.status(200).json({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      })
    } catch(err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const { title, description, status, due_date } = req.body
      const todo = await Todo.findByPk(id)

      if(!todo) throw {
        message: 'Error not found', statusCode: 404
      }
      todo.title = title
      todo.description = description
      todo.status = status
      todo.due_date = due_date

      await todo.save()
      res.status(200).json({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      })
    } catch(err) {
      next(err)
    }
  }

  static async status(req, res, next) {
    try{
      const { id } = req.params
      const { status } = req.body

      const todo = await Todo.findByPk(id)

      if(!todo) throw {
        message: 'Error not found', statusCode: 404
      }

      todo.status = status
      await todo.save()

      res.status(200).json({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      })

    } catch(err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const todo = await Todo.findByPk(id)
      if(!todo) throw {
        message: 'Error not found'
      }
      todo.destroy()
      res.status(200).json({ message: 'Successfully deleted!'})
    } catch(err) {
      next(err)
    }
  }
}

module.exports = TodoController