const { Todo } = require('../models')

class TodoController {
  static async showAll(req, res) {
    try {
      const todos = await Todo.findAll()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async add(req, res) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    try {
      const newData = await Todo.create(payload)
      res.status(201).json(newData)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async find(req, res) {
    const id = +req.params.id

    try {
      const result = await Todo.findByPk(id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async edit(req, res) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    const option = {
      where: { id: +req.params.id },
      returning: true
    }

    try {
      const updatedData = await Todo.update(payload, option)
      res.status(200).json(updatedData[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async updateStatus(req, res) {
    const payload = {
      status: req.body.status
    }
    const option = {
      where: { id: +req.params.id },
      returning: true
    }

    try {
      const updatedStatus = await Todo.update(payload, option)
      res.status(200).json(updatedStatus[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async delete(req, res) {
    const option = {
      where: { id: +req.params.id }
    }
    try {
      const deleted = await Todo.destroy(option)
      res.status(200).json({
        "message": "todo success to delete"
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TodoController