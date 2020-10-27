const { User, Todo } = require("../models");
const Helper = require("../helpers/helper");

class Middleware {
  static authentication(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      throw { message: "Authentication Failed", status: 401 };
    } else {
      const decoded = Helper.verifyToken(token);
      User.findOne({
        where: {
          email: decoded.email,
        },
      })
        .then((data) => {
          if (!data) throw { message: "Authentication Failed", status: 401 };
          else {
            req.suksesMasuk = decoded;
            next();
          }
        })
        .catch((err) => {
          const status = err.status || 500;
          const msg = err.msg || "Internal Server Error";
          res.status(status).json({ error: msg });
        });
    }
  }

  static authorization(req, res, next) {
    const todoId = +req.params.id;

    Todo.findByPk(todoId)
      .then((data) => {
        if (!data) throw { message: "Todo not found", status: 404 };
        else if (data.UserId === req.suksesMasuk.id) next();
        else throw { message: "Not Authorized", status: 401 };
      })
      .catch((err) => {
        const status = err.status || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ error: message });
      });
  }
}

module.exports = Middleware;
