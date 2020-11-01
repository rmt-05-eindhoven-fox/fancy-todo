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
          next(err);
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
        next(err);
      });
  }

  static errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let msg = err.msg || "Internal Server Error";

    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      status = 400;
      msg = err.errors.map((el) => el.message).join(", ");
    } else if (err.name === "Invalid Input") {
      status = 401;
      msg = "Wrong email/password";
    } else if (err.name === "Authentication failed") {
      status = 401;
      msg = "Authentication failed";
    } else if (err.name === "Not authorized") {
      status = 401;
      msg = "Not authorized";
    } else if (err.name === "Post not found") {
      status = 404;
      msg = "Post not found";
    }
    console.log(err);
    res.status(status).json({ msg });
  }
}

module.exports = Middleware;
