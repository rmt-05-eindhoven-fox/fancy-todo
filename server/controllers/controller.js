const {Todo} = require('../models')

class Controller {

  static async showTodos(req, res) {
    try {
      const todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async addTodo(req, res) {
    const {title, description, status, due_date} = req.body

    try {
      const newTask = await Todo.create({
        title, description, status, due_date
      })
      const showTask = {
        id: newTask.id,
        title: newTask.title, 
        description: newTask.description,
        status: newTask.status,
        due_date: newTask.due_date
      }
      res.status(201).json(showTask)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async getOneTodo(req, res) {
    const id = req.params.id

    try {
      const task = await Todo.findByPk(id)
      res.status(200).json(task)
    } catch (error) {
      res.status(404).json(error)
    }
  }

  static async updateTodo(req, res) {
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
      res.status(400).json(error)
    }
  }

  static async patchTodo(req, res) {
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
      res.status(404).json(error)
    }
  }

  static async deleteTodo(req, res) {
    const id = req.params.id

    try {
      const deleted = await Todo.destroy({
        where: {id}
      })
      res.status(200).json({
        message: 'task deleted successfully'
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = Controller