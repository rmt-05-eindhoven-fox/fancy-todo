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
      // console.log(create);
      res.status(201).json(create);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({
          error: error.errors.map(err => err.message).join(' ')
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
      const findAllTodos = await Todo.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
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
      const findTodo = await Todo.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

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
        },
        returning: true,
        individualHooks: true
      });

      if (updateAllKey[0]) {
        res.status(200).json(updateAllKey[1][0]);
      } else {
        // TODO handle case when req.body has same data as database
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({
          error: error.errors.map(err => err.message).join(' ')
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
      let update = await Todo.update({ status }, { 
        where: { id },
        returning: true,
        individualHooks: true 
      });

      if (update[0]) {
        res.status(200).json(update[1][0]);
      } else {
        // TODO handle case when req.body has same data as database
        throw {
          status: 404,
          msg: 'Error not found'
        };
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({
          error: error.errors.map(err => err.message).join(' ')
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
      const todoDeleted = await Todo.destroy({ where : { id }});

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