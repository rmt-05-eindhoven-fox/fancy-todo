const { Todo } = require('../models');

class TodoController {
  static async create(req, res, next) {
    const UserId = +req.user.id; 
    try {
      const { title, description, due_date } = req.body;
      const create = await Todo.create({
        title,
        description,
        due_date,
        UserId
      });
      // console.log(create);
      res.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    const UserId = +req.user.id;
    try {
      const findAllTodos = await Todo.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          UserId
        }
      });
      res.status(200).json(findAllTodos);
    } catch (error) {
      next(error);
    }
  }

  static async findTodo(req, res, next) {
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
          name: 'NotFound'
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateTodo(req, res, next) {
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
      console.log(updateAllKey);
      if (updateAllKey[1].length > 0) {
        res.status(200).json(updateAllKey[1][0]);
      } else {
        // TODO handle case when req.body has same data as database
        // ! DONE
        throw {
          name: 'NotFound'
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async patchTodo(req, res, next) {
    try {
      const id = +req.params.id;
      const { status } = req.body;
      console.log(status);
      let update = await Todo.update({ status }, { 
        where: { id },
        returning: true,
        individualHooks: true 
      });

      if (update[1].length > 0) {
        res.status(200).json(update[1][0]);
      } else {
        // TODO handle case when req.body has same data as database
        // ! DONE
        throw {
          name: 'NotFound'
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = +req.params.id;
      // console.log(id, '------------------');
      const todoDeleted = await Todo.destroy({ where : { id }});

      if (todoDeleted) {
        res.status(200).json({
          message: 'todo success to delete'
        });
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;