const { Todo, Project } = require('../models')

class TodoController {
  static async showAll(req, res, next) {
    try {
      const option = {
        where: {
          UserId: req.loggedInUser.id
        }
      }
      const todos = await Todo.findAll(option)
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedInUser.id,
      ProjectId: req.body.ProjectId
    }
    console.log(payload)
    try {
      const newData = await Todo.create(payload)
      res.status(201).json(newData)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async find(req, res, next) {
    const option = {
      where: {
        id: req.params.id
      }
    }
    try {
      const result = await Todo.findOne(option)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      ProjectId: req.body.ProjectId
    }
    const option = {
      where: { id: +req.params.id },
      returning: true,
      include: Project
    }

    try {
      const updatedData = await Todo.update(payload, option)
      res.status(200).json(updatedData[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
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
      next(error)
    }
  }

  static async delete(req, res, next) {
    const option = {
      where: { id: req.params.id }
    }
    try {
      const deleted = await Todo.destroy(option)
      res.status(200).json({
        "msg": "todo success to delete"
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTodoProject(req, res, next) {
    const option = {
      where: { ProjectId: req.params.id },
      include: Project
    }
    try {
      const todos = await Todo.findAll(option)
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController