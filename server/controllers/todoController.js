const {
  Todo
} = require('../models')

class TodoController {

  //#region getTodo
  static async getTodo(req, res) {
    try {
      const todos = await Todo.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  //#endregion


  //#region getTodoById
  static async getTodoById(req, res) {
    const id = +req.params.id

    try {
      const todos = await Todo.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(todos)
    } catch (error) {
      res.status(404).json(error)
    }
  }
  //#endregion


  //#region postTodo
  static async postTodo(req, res) {
    const {
      title,
      description,
      status,
      due_date,
    } = req.body

    try {
      const newTodo = await Todo.create({
        title,
        description,
        status,
        due_date,
      })

      const resultTodo = {
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
        due_date: newTodo.due_date
      }

      res.status(201).json(resultTodo)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
  //#endregion


  //#region updateTodo
  static async updateTodo(req, res) {
    const id = +req.params.id
    const {
      title,
      description,
      status,
      due_date
    } = req.body

    try {
      const newTodo = await Todo.update({
        title,
        description,
        status,
        due_date
      }, {
        where: {
          id
        },
        returning: ['id', 'title', 'description', 'status', 'due_date']
      })

      res.status(200).json(newTodo[1][0])

    } catch (error) {
      res.status(400).json(error)
    }
  }
  //#endregion


  //#region statusTodo
  static async statusTodo(req, res) {
    const id = +req.params.id
    const {
      status
    } = req.body

    try {
      const newTodo = await Todo.update({
        status
      }, {
        where: {
          id
        },
        returning: ['id', 'title', 'description', 'status', 'due_date']
      })

      if (newTodo[0] > 0) {
        res.status(200).json(newTodo[1][0])

      } else {
        res.status(404).json({
          message: `Error not found`
        })
      }

    } catch (error) {
      res.status(404).json(error)
    }
  }
  //#endregion


  //#region deleteTodo
  static async deleteTodo(req, res) {
    const id = +req.params.id

    try {
      const deleted = await Todo.destroy({
        where: {
          id
        }
      })

      if (deleted > 0) {
        res.status(200).json({
          message: 'todo success to delete'
        })

      } else {
        res.status(404).json({
          message: `can't find id`
        })

      }

    } catch (error) {
      res.status(500).json(error)
    }
  }
  //#endregion
}

module.exports = TodoController;