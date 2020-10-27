const { Todo, User } = require('../models/index')

class TodoController {

  static findAll(req, res, next) {
    Todo.findAll({
      where: { 
        UserId: req.userData.id 
      }
    })
      .then((todos) => {
        res.status(200).json(todos)
      }).catch((err) => {
        next(err)
      })
  }

  static create (req, res, next) {
    const { 
      title, 
      description, 
      status,
      due_date 
    } = req.body
    const todoObj = { 
      title, 
      description, 
      status,
      due_date, 
      UserId: req.userData.id 
    }

    Todo.create(todoObj)
      .then((todo) => {
        res.status(201).json({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: todo.due_date,
          UserId: todo.UserId
        })
      }).catch((err) => {
        next(err)
      })
  }

  static findId(req, res, next) {
    const { id } = req.params
    Todo.findByPk(id)
      .then((todo) => {
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
      }).catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const { id } = req.params
    const { title, description, status, due_date } = req.body
    
    Todo.findByPk(id)
    .then((todo) => {
      if(!todo) throw {
        message: 'Error not found', statusCode: 404
      }
      todo.title = title
      todo.description = description
      todo.status = status
      todo.due_date = due_date

      todo.save()
      res.status(200).json({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date
      })
      }).catch((err) => {
        next(err)
      })
  }

  static status (req, res, next) {
    const { id } = req.params
    const { status } = req.body
    Todo.findByPk(id)
      .then((todo) => {
        if(!todo) throw {
          message: 'Error not found', statusCode: 404
        }
  
        todo.status = status
         todo.save()
  
        res.status(200).json({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: todo.due_date
        })
      }).catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const { id } = req.params
    Todo.findByPk(id)
    .then((todo) => {
      if(!todo) throw {
        message: 'Error not found'
      }
      todo.destroy()
      res.status(200).json({ message: 'Successfully deleted!'})
      }).catch((err) => {
        next(err)
      })
  }

}

module.exports = TodoController