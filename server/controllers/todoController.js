const {
  Todo
} = require('../models')


class TodoController {

  //#region getTodo
  static async getTodo(req, res, next) {
    const userId = req.loggedInUser.id
    try {
      const todos = await Todo.findAll({
        where: {
          userId
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
      next(error)
    }
  }
  //#endregion


  //#region postTodo
  static async postTodo(req, res, next) {
    const userId = +req.loggedInUser.id
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
        userId
      })

      const resultTodo = {
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
        due_date: newTodo.due_date,
        userId: newTodo.userId
      }
      res.status(201).json(resultTodo)
    } catch (error) {
      next(error)
    }
  }
  //#endregion


  //#region updateTodo
  static async updateTodo(req, res, next) {
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
      next(error)
    }
  }
  //#endregion


  //#region statusTodo
  static async statusTodo(req, res, next) {
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
      next(error)
    }
  }
  //#endregion


  //#region deleteTodo
  static async deleteTodo(req, res, next) {
    const id = +req.params.id

    try {
      const deleted = await Todo.destroy({
        where: {
          id
        }
      })

      if (deleted > 0) {
        res.status(200).json({
          message: 'Todo is succesfully deleted!'
        })

      } else {
        res.status(404).json({
          message: `Todo not found!`
        })

      }

    } catch (error) {
      next(error)
    }
  }
  //#endregion
}

module.exports = TodoController;