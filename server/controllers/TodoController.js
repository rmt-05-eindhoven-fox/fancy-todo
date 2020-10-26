const { Todo } = require("../models/index");

class TodoController {

  static async createTodo(req, res) {
    try {
      const { title, description, status, due_date } = req.body;
      let todoObj = {
        title,
        description,
        status,
        due_date
      };
      const todo = await Todo.create(todoObj);
      res.status(201).json(todo);
    } catch (err) {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          res.status(400).json(errors);
        }
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async readTodo(req, res) {
    try {
      const todos = await Todo.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getTodoById(req, res) {
    try {
      let id = +req.params.id;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        res.status(404).json({ msg: `Error not found!`});
      } else {
        res.status(200).json(todo);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateTodoById(req, res) {
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
      if (!todo[1][0]) {
        res.status(404).json({ msg: `Error not found!`});
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (err) {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          res.status(400).json(errors);
        }
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async updateStatusTodoById(req, res) {
    try {
      let id = +req.params.id;
      let status = req.body.status;
      const todo = await Todo.update({ status: status }, { where: {id}, returning: true });
      if (!todo[1][0]) {
        res.status(404).json({ msg: `Error not found!`});
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (err) {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          res.status(400).json(errors);
        }
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      let id = +req.params.id;
      const todo = await Todo.destroy({ where: {id} });
      if (!todo) {
        res.status(404).json({ msg: `Error not found!`});
      } else {
        res.status(200).json({
          msg: `Successfully delete a todo with Id ${id}!`
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

}

module.exports = TodoController;