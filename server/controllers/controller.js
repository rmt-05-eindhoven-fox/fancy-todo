const {Todo, User} = require('../models')

const {comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {

  static async showTodos(req, res) {
    try {
      const todos = await Todo.findAll({
        attributes: { exclude : ['createdAt', 'updatedAt']}
      })
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
      const addTask = {
        id: newTask.id,
        title: newTask.title, 
        description: newTask.description,
        status: newTask.status,
        due_date: newTask.due_date
      }
      res.status(201).json(addTask)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async getOneTodo(req, res) {
    const id = req.params.id

    try {
      const task = await Todo.findByPk(id, {
        attributes: { exclude : ['createdAt', 'updatedAt']}
      })
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

  // Register, Login
  static async register(req, res) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.create(payload)

      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async login(req, res) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email
        }
      })

      if (!user) {
        res.status(401).json({
          message: 'Invalid email or password'
        })
      } else if (!comparePassword(payload.password, user.password)) {
        res.status(401).json({
          message: 'Invalid email or password'
        })
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })

        res.status(200).json({
          access_token
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

}

module.exports = Controller