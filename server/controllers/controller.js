const { ToDo } = require('../models')

class ToDoController {

  static async findAll(req, res) {
    try {
      const list = await ToDo.findAll()
      res.status(200).json(list)
    }
    catch (err) {
      res.status(500).json(err)
    }
  }

  static async findOne(req, res) {
    const id = +req.params.id
    try {
      let find = await ToDo.findOne({ where: { id } })
      res.status(200).json(find)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async add(req, res) {
    const { title, description, status, due_date } = req.body
    try {
      const add = await ToDo.Create({ title, description, status, due_date })
      res.status(201).json(add)
    }
    catch (err) {
      res.status(500).send(err)
    }
  }

  static async edit(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date } = req.body
    try {
      const edit = await ToDo.Update({ title, description, status, due_date }, {
        where: { id }
      })
      res.status(200).json(edit)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async editStatus(req, res) {
    const id = +req.params.id
    const status = req.body.status
    try {
      const editStatus = await ToDo.Update({ status }, {
        where: {
          id
        }
      })
      res.status(200).json(editStatus)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleted(req, res) {
    const id = +req.params.id
    try {
      const find = await ToDo.findOne({ where: { id } })
      await ToDo.destroy({ where: { id } })
      res.status(200).json(find)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = ToDoController