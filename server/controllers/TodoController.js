const { Todo } = require("../models/index");

class TodoController {

  static createTodo(req, res) {
    const {title, description, status, due_date} = req.body;
    let todoObj = {
      title,
      description,
      status,
      due_date
    };
    Todo.create(todoObj)
    .then((todo) => {
      res.status(201).json(todo);
    }).catch((err) => {
      res.status(500);
    });
  }

  static readTodo(req, res) {
    Todo.findAll({ order: [["id", "ASC"]] })
    .then((todos) => {
      res.status(200).json(todos);
    }).catch((err) => {
      res.status(500);
    });
  }

  static getTodoById(req, res) {
    let id = +req.params.id;
    Todo.findByPk(id)
    .then((todo) => {
      res.status(200).json(todo);
    }).catch((err) => {
      res.status(500);
    });
  }

  static updateTodoById(req, res) {
    let id = +req.params.id;
    const {title, description, status, due_date} = req.body;
    let todoObj = {
      title,
      description,
      status,
      due_date
    };
    Todo.update(todoObj, { where: {id}, returning: true })
    .then((todo) => {
      res.status(200).json(todo[1][0]);
    }).catch((err) => {
      res.status(500);
    });
  }

  static updateStatusTodoById(req, res) {
    let id = +req.params.id;
    let status = req.body.status;
    Todo.update({ status: status }, { where: {id}, returning: true })
    .then((todo) => {
      res.status(200).json(todo[1][0]);
    }).catch((err) => {
      res.status(500);
    });
  }

  static deleteTodo(req, res) {
    let id = +req.params.id;
    Todo.destroy({ where: {id} })
    .then((todo) => {
      res.status(200).json({
        msg: `Successfully delete a todo with Id ${id}!`
      });
    }).catch((err) => {
      res.status(500);
    });
  }

}

module.exports = TodoController;