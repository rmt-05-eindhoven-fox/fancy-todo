const { Todo } = require("../models");
const axios = require("axios");

class TodosController {
  static post(req, res, next) {
    const { title, description, status, due_date } = req.body;
    const UserId = req.suksesMasuk.id;

    const create = Todo.create({
      title,
      description,
      status,
      due_date,
      UserId,
    }).then((data) => {
      return data;
    });

    const kanyeQuote = axios({
      method: "get",
      url: "https://api.kanye.rest/",
    }).then((data) => {
      return data.data;
    });

    Promise.all([create, kanyeQuote])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static get(req, res, next) {
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
        next(err);
      });
  }

  static getOne(req, res, next) {
    const todoId = +req.params.id;

    Todo.findOne({
      where: {
        id: todoId,
      },
    })
      .then((data) => {
        if (data == null) throw { message: "Todo Not Found", status: 404 };
        else res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static put(req, res, next) {
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
        if (data[0] == 0) throw { message: "Todo Not Found", status: 404 };
        res.status(200).json(data[1][0]);
      })
      .catch((err) => {
        next(err);
      });
  }

  static patch(req, res, next) {
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
        if (data[0] == 0) throw { message: "Todo Not Found", status: 404 };
        res.status(200).json(data[1][0]);
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const todoId = +req.params.id;

    Todo.destroy({
      where: {
        id: todoId,
      },
    })
      .then((data) => {
        if (data == 0) throw { message: "Todo Not Found", status: 404 };
        res.status(200).json({ msg: "todo is deleted successfully" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodosController;
