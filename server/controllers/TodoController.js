const { Todo } = require("../models/index");

class TodoController {

  static async createTodo(req, res, next) {
    try {
      const { title, description, status, due_date } = req.body;
      const UserId = +req.userLoggedIn.id;
      let todoObj = {
        title,
        description,
        status,
        due_date,
        UserId
      };
      const todo = await Todo.create(todoObj);
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async readTodo(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const todos = await Todo.findAll({ where: { UserId } ,order: [["updatedAt", "DESC"]] });
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  static async getTodoById(req, res, next) {
    try {
      let id = +req.params.id;
      const todo = await Todo.findByPk(id);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async updateTodoById(req, res, next) {
    try {
      let id = +req.params.id;
      const { title, description, status, due_date } = req.body;
      let todoObj = {
        title,
        description,
        status,
        due_date
      };
      const todo = await Todo.update(todoObj, { where: {id}, returning: true });
      res.status(200).json(todo[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusTodoById(req, res, next) {
    try {
      let id = +req.params.id;
      let status = req.body.status;
      const todo = await Todo.update({ status: status }, { where: {id}, returning: true });
      res.status(200).json(todo[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      let id = +req.params.id;
      const todo = await Todo.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully delete a todo!`
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = TodoController;