const { ToDo } = require('../models/')

class ToDoController {

  static async findAll(req, res, next) {
    const UserId = +req.loginCredential.id
    console.log(req.loginCredential)
    try {
      const list = await ToDo.findAll({
        where: { UserId }
      })

      res.status(200).json(list)
    }
    catch (err) {
      next(err)
    }
  }

  static async findOne(req, res, next) {
    const UserId = +req.loginCredential.id
    const id = +req.params.id
    try {
      let find = await ToDo.findOne({ where: { id, UserId } })
      res.status(200).json(find)
    } catch (err) {
      err.status = 404
      next(err)
    }
  }

  static async add(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: +req.loginCredential.id
    }

    try {
      const add = await ToDo.create(data)
      res.status(201).json(add)
    }
    catch (err) {
      err.status = 400
      next(err)
    }
  }

  static async edit(req, res, next) {
    const id = +req.params.id
    const UserId = +req.loginCredential.id
    const { title, description, status, due_date } = req.body
    try {
      const edit = await ToDo.update({ title, description, status, due_date }, {
        where: { id, UserId }, returning: true
      })
      if (!edit) {
        throw { message: 'ToDo Not Found', status: 404 }
      }
      res.status(200).json(edit[1][0])
    } catch (err) {
      err.status = 400
      next(err)
    }
  }

  static async editStatus(req, res, next) {
    const UserId = +req.loginCredential.id
    const id = +req.params.id
    const status = req.body.status
    try {
      const editStatus = await ToDo.update({ status }, {
        where: {
          id,
          UserId
        }, returning: true
      })
      if (!editStatus) {
        throw { message: 'ToDo Not Found', status: 404 }
      }
      res.status(200).json(editStatus[1][0])
    } catch (err) {
      err.status = 400
      next(err)
    }
  }

  static async deleted(req, res, next) {
    const UserId = +req.loginCredential.id
    const id = +req.params.id
    try {
      const deleted = await ToDo.destroy({ where: { id, UserId } }
      )
      if (!deleted) {
        throw { message: 'ToDo Not Found', status: 404 }
      }
      res.status(200).json({ msg: 'ToDO deleted Succesfully' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ToDoController