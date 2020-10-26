const { Todo } = require('../models');

class TodoController {
  static async create(req, res) {
    try {
      const { title, description, status, due_date } = req.body;
      const create = await Todo.create({
        title,
        description,
        status,
        due_date
      });
      res.status(201).json(create);
    } catch (error) {
      if (error.name = 'SequelizeValidationError') {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error'
        });
      }
    }
  }

  static async findAll(req, res) {
    try {
      const findAllTodos = await Todo.findAll();
      res.status(200).json(findAllTodos);
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  static async findTodo(req, res) {
    try {
      const id = +req.params.id;
      const findTodo = await Todo.findByPk(id);

      if (findTodo) {
        res.status(200).json(findTodo);
      } else {
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.msg || 'Internal server error'
      });
    }
  }

  static async updateTodo(req, res) {
    try {
      const id = +req.params.id;
      const { title, description, status, due_date } = req.body;
      let updateAllKey = await Todo.update({
        title,
        description,
        status,
        due_date
      }, {
        where: {
          id
        }
      });

      [ updateAllKey ] = updateAllKey;

      if (updateAllKey) {
        res.status(200).json(updateAllKey);
      } else {
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      if (error.name = 'SequelizeValidationError') {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(error.status || 500).json({
          error: error.msg || 'Internal server error'
        });
      }
    }
  }

  static async patchTodo(req, res) {
    try {
      const id = +req.params.id;
      const { status } = req.body;
      let update = await Todo.update({ status }, { where: { id } });

      [ update ] = update;

      if (update) {
        res.status(200).json(update)
      } else {
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      if (error.name = 'SequelizeValidationError') {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(error.status || 500).json({
          error: error.msg || 'Internal server error'
        });
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = +req.params.id;
      const todoDeleted = await Todo.destroy(id);

      if (todoDeleted) {
        res.status(200).json({
          message: 'todo success to delete'
        });
      } else {
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.msg || 'Internal server error'
      });
    }
  }
}

module.exports = TodoController;