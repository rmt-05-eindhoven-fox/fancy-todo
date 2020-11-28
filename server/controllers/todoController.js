const {Todo} = require('../models')

// const {comparePassword} = require('../helpers/bcrypt')
// const { signToken } = require('../helpers/jwt')

class TodoController {

  static async showTodos(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const todos = await Todo.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          UserId
        }
      })
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }

  static async addTodo(req, res, next) {
    const UserId = req.loggedInUser.id
    const {title, description, status, due_date} = req.body

    try {
      const newTask = await Todo.create({
        title, description, status, due_date, UserId
      })
      const addTask = {
        id: newTask.id,
        title: newTask.title, 
        description: newTask.description,
        status: newTask.status,
        due_date: newTask.due_date,
        UserId
      }
      res.status(201).json(addTask)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getOneTodo(req, res, next) {
    const UserId = req.loggedInUser.id
    const id = req.params.id

    try {
      const task = await Todo.findByPk(id, {
        attributes: { exclude : ['createdAt', 'updatedAt']},
        where: {
          UserId
        }
      })
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async updateTodo(req, res, next) {
    const id = req.params.id
    const {title, description, status, due_date} = req.body

    try {
      const update = await Todo.update({
        title, description, status, due_date
      }, {
        where: {id},
        returning: ['id', 'title', 'description', 'status', 'due_date']
      })
      res.status(200).json(update[1][0])
    } catch(error) {
      console.log(error)
      next(error)
    }
  }

  static async patchTodo(req, res, next) {
    const id = req.params.id
    const {status} = req.body

    try {
      const patch = await Todo.update({
        status
      }, {
        where: {id},
        returning: ['id', 'title', 'description', 'status', 'due_date']
      }) 
      res.status(200).json(patch[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteTodo(req, res, next) {
    const id = req.params.id

    try {
      const deleted = await Todo.destroy({
        where: {id}
      })
      res.status(200).json({
        message: 'task deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController