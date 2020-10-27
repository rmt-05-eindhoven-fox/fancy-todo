const { Todo, User } = require('../models')

module.exports = class TodoController {
  static async add (req, res) {
    try {
      let { id } = req.login
      let { title, description, status, due_date } = req.body
      const hasil = await Todo.create({ title, description, status, due_date, userFK: id })
      res.status(201).json(hasil)
    } catch (err) {
      if(err.name === "SequelizeValidationError") {
        return res.status(400).json(err.errors[0])
      }
      res.status(500).json(error)
    }
  }
  static async view(req, res) {
    try {
      let { id } = req.login
      let hasil = await Todo.findAll({ where: { userFK: id }})
      res.status(200).json(hasil)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async viewOne(req, res) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      let hasil = await Todo.findOne({ where: { userFK: userId, id }})
      if(hasil === null) {
        throw new Error(`Row with id "${id}" not found`)
      }
      res.status(200).json(hasil)
    } catch (err) {
      res.status(404).json({error: err.message})
    }
  }
  static async updatePut(req, res) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      let hasil = await Todo.update(req.body, { where: { id, userFK: userId }, returning: true })
      if(hasil[0] === 0) {
        throw new Error(`Row with id "${id}" not found`)
      }
      res.status(200).json(hasil[1][0])
    } catch(err) {
      if(err.name === "SequelizeValidationError") {
        return res.status(400).json(err.errors[0])
      }
      if(err.name === "Error") {
        return res.status(404).json({error: err.message})
      }
      res.status(500).json(err)
    }
  }
  static async patch(req, res) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      const hasil = await Todo.update({ status: true}, { where: { id, userFK: userId }, returning: true })
      if(hasil[0] === 0) {
        throw new Error(`Row with id "${id}" not found`)
      }
      res.status(200).json(hasil[1][0])
    } catch (err) {
      if(err.name === "SequelizeValidationError") {
        return res.status(400).json(err.errors[0])
      }
      if(err.name === "Error") {
        return res.status(404).json({error: err.message})
      }
      res.status(500).json(err)
    }
  }
  static async delete(req, res) {
    try {
      let userId  = req.login.id
      let { id } = req.params
      const deleted = await Todo.findByPk(id)
      if(deleted === null) {
        throw new Error(`Row with id "${id}" not found`)
      }
      const hasil = await Todo.destroy({ where: { id, userFK: userId }, returning: true })
      res.status(200).json(deleted)
    } catch(err) {
      if(err.name === "Error") {
        throw res.status(404).json({error: err.message})
      }
      res.status(500).json(err)
    }
  }
}
