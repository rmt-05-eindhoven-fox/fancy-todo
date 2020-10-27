const { Todo, User } = require('../models')

module.exports = class TodoController {
  static async add (req, res, next) {
    try {
      console.log('sampai sini')
      let { id } = req.login
      let { title, description, status, due_date } = req.body
      const hasil = await Todo.create({ title, description, status, due_date, userFK: id })
      res.status(201).json(hasil)
    } catch(err) {
      next({ msg: err.errors[0].message, status: 400})
    }
  }
  static async view(req, res, next) {
    try {
      let { id } = req.login
      let hasil = await Todo.findAll({ where: { userFK: id }})
      res.status(200).json(hasil)
    } catch (err) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
  static async viewOne(req, res, next) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      let hasil = await Todo.findOne({ where: { userFK: userId, id }})
      if(hasil === null) {
        throw new Error(`Row with id "${id}" not found`)
      }
      res.status(200).json(hasil)
    } catch (err) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
  static async updatePut(req, res, next) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      let hasil = await Todo.update(req.body, { where: { id, userFK: userId }, returning: true })
      if(hasil[0] === 0) next({ msg: 'Todo not found', status: 404})
      res.status(200).json(hasil[1][0])
    } catch(err) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
  static async patch(req, res, next) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      const hasil = await Todo.update({ status: true}, { where: { id, userFK: userId }, returning: true })
      if(hasil[0] === 0) next({ msg: 'Todo not found', status: 404})
      res.status(200).json(hasil[1][0])
    } catch (err) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
  static async delete(req, res, next) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      const deleted = await Todo.findByPk(id)
      if(deleted === null) next({ msg: 'Todo not found', status: 404})
      await Todo.destroy({ where: { id, userFK: userId }, returning: true })
      res.status(200).json(deleted)
    } catch(err) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
}
