const { Todo } = require("../models");

class TodosController {
  static post(req, res) {
    const { title, description, status, due_date } = req.body;
    const UserId = req.suksesMasuk.id;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") res.status(400).json(err);
        else res.status(500).json(err);
      });
  }

  static get(req, res) {
    const userId = req.suksesMasuk.id;
    Todo.findAll({
      where: {
        UserId: userId,
      },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getOne(req, res) {
    const todoId = +req.params.id;

    Todo.findOne({
      where: {
        id: todoId,
      },
    })
      .then((data) => {
        if (data == null) res.status(404).json({ error: "DATA NOT FOUND" });
        else res.status(200).json(data);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static put(req, res) {
    const { title, description, status, due_date } = req.body;

    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: {
          id: +req.params.id,
        },
        returning: true,
      }
    )
      .then((data) => {
        if (data[0] == 0) res.status(404).json({ error: "DATA NOT FOUND" });
        res.status(200).json(data[1][0]);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") res.status(400).json(err);
        else res.status(500).json(err);
      });
  }

  static patch(req, res) {
    const { status } = req.body;

    Todo.update(
      {
        status,
      },
      {
        where: {
          id: +req.params.id,
        },
        returning: true,
      }
    )
      .then((data) => {
        if (data[0] == 0) res.status(404).json({ error: "DATA NOT FOUND" });
        res.status(200).json(data[1][0]);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") res.status(400).json(err);
        else res.status(500).json(err);
      });
  }

  static delete(req, res) {
    const todoId = +req.params.id;

    Todo.destroy({
      where: {
        id: todoId,
      },
    })
      .then((data) => {
        if (data == 0) res.status(404).json({ err: "DATA NOT FOUND" });
        else res.status(200).json({ msg: "todo is deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = TodosController;
