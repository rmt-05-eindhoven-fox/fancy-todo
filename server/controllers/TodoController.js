const { Todo } = require("../models/index");

class TodoController {

  static async createTodo(req, res) {
    try {
      const {title, description, status, due_date} = req.body;
      let todoObj = {
        title,
        description,
        status,
        due_date
      };
      const todo = await Todo.create(todoObj);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async readTodo(req, res) {
    try {
      const todos = await Todo.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getTodoById(req, res) {
    try {
      let id = +req.params.id;
      const todo = await Todo.findByPk(id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateTodoById(req, res) {
    try {
      let id = +req.params.id;
      const {title, description, status, due_date} = req.body;
      let todoObj = {
        title,
        description,
        status,
        due_date
      };
      const todo = await Todo.update(todoObj, { where: {id}, returning: true });
      res.status(200).json(todo[1][0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateStatusTodoById(req, res) {
    try {
      let id = +req.params.id;
      let status = req.body.status;
      const todo = await Todo.update({ status: status }, { where: {id}, returning: true });
      res.status(200).json(todo[1][0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteTodo(req, res) {
    try {
      let id = +req.params.id;
      const todo = await Todo.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully delete a todo with Id ${id}!`
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

module.exports = TodoController;