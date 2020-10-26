const { Todo } = require('../models');

class TodoController {

  static index(req, res) {
    Todo.findAll()
      .then((todos) => {
        res.status(200).json(todos)
      }).catch((err) => {
        res.status(500).json(err.stack);
      });
  }

  static store(req, res) {
    const { title, description, due_date } = req.body;
    const input = { title, description, due_date };
    // res.status(200).json(input)
    Todo.create(input)
      .then((todo) => {
        res.status(200).json(todo);
      }).catch((err) => {
        if (err.name === 'SequelizeValidationError' || 'SequelizeUniqueConstraintError') {
          const errors = err.errors.map(el => {
            return el.message;
          })
          res.status(400).json(errors);
        } else {
          res.status(500).json(err.stack)
        }
      });
  }

  static show(req, res) {
    const { id } = req.params;
    Todo.findByPk(id)
      .then((todo) => {
        if (!todo) {
          res.status(404).json({ error: 'Data not found' })
        } else {
          res.status(200).json(todo);
        }
      }).catch((err) => {
        res.send(500).json(err.stack);
      });
  }

  static update(req, res) {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const input = { title, description, status, due_date };
    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0]);
        } else {
          res.status(404).json({ error: 'Data not found' })
        }
      }).catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(el => {
            return el.message;
          })
          res.status(400).json(errors);
        } else {
          res.status(500).json(err.stack)
        }
      });
  }

  static patch(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const input = { status };
    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then((todo) => {
        if (todo[0] > 0) {
          res.status(200).json(todo[1][0])
        } else {
          res.status(404).json({ error: 'Data not found' })
        }
      }).catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(el => {
            return el.message;
          })
          res.status(400).json(errors);
        } else {
          res.status(500).json(err.stack)
        }
      });
  }

  static destroy(req, res) {
    const { id } = req.params;
    Todo.destroy({ where: { id } })
      .then((result) => {
        if (result > 0) {
          res.status(200).json({ message: 'Todo success to delete!' })
        } else {
          res.status(404).json({ error: 'Data not found' })
        }
      }).catch((err) => {
        res.status(500).json(err.stack)
      });
  }

}

module.exports = TodoController;