const { Todo, User } = require('../models')

class ControllerTodo {
  static async allTodo(req, res, next) {
    try {
      const data = await Todo.findAll({
        where: {
          UserId: req.userLogedIn.id
        },
        order: [['id', 'ASC']]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async postTodos(req, res, next) {
    try {
      const newTodo = {
        title: req.body.title,
        description: req.body.description,
        due_date: new Date(req.body.due_date + ' UTC'),
        UserId: req.userLogedIn.id
      }

      const data = await Todo.create(newTodo)
      res.status(201).json({
        title: data.title,
        description: data.description,
        status: data.status,
        UserId: data.UserId,
        due_date: data.due_date
      })

    } catch (error) {
      next(error)
    }
  }

  static async getIdTodos(req, res) {
    try {
      const id = +req.params.id
      const result = await Todo.findByPk(id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async putTodos(req, res) {
    try {
      const updated = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const updatedId = +req.params.id
      const data = await Todo.update(updated, {
        where: {
          id: updatedId
        },
        returning: true
      })
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async patchIdTodos(req, res) {
    try {
      const id = +req.params.id
      const parameter = {
        status: "true"
      }
      const result = await Todo.update(parameter, {
        where: {
          id: id
        },
        returning: true
      })
      res.status(200).json(result[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteIdTodos(req, res) {
    try {
      const deletedId = req.params.id
      const result = await Todo.destroy({
        where: {
          id: deletedId
        }
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerTodo