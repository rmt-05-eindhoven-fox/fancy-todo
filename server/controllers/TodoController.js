const createError = require('http-errors');
const { Todo, User } = require('../models');

class TodoController {

  static index(req, res, next) {
    Todo.findAll({
      where: { UserId: req.logedInUser.id }
    })
      .then((todos) => {
        res.status(200).json(todos)
      }).catch((err) => {
        next(err)
      });
  }

  static store(req, res, next) {
    const UserId = req.logedInUser.id;
    const { title, description, due_date } = req.body;
    const input = { title, description, due_date, UserId };

    Todo.create(input)
      .then((todo) => {
        res.status(200).json(todo);
      }).catch((err) => {
        next(err);
      });
  }

  static show(req, res, next) {
    const { id } = req.params;
    Todo.findByPk(id)
      .then((todo) => {
        res.status(200).json(todo);
      }).catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const input = { title, description, status, due_date };
    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then((todo) => {
        res.status(200).json(todo[1][0]);
      }).catch((err) => {
        next(err);
      });
  }

  static patch(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    const input = { status };
    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then((todo) => {
        res.status(200).json(todo[1][0]);
      }).catch((err) => {
        next(err);
      });
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    Todo.destroy({ where: { id } })
      .then((result) => {
        res.status(200).json({ message: 'Todo success to delete!' });
      }).catch((err) => {
        next(err);
      });
  }

}

module.exports = TodoController;