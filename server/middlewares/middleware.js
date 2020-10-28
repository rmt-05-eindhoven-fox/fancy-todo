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
    // console.log("sukses masuk");
    // for (const x in err) console.log(err[x]);
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
    if (err.name === "SequelizeValidationError") {
      status = 400;
      message = "";
      err.errors.forEach((eachErrorMsg, index) => {
        if (index === 0) message += `${eachErrorMsg.message}`;
        else if (index >= 1) message += `, ${eachErrorMsg.message}`;
      });
    } else if (err.message === "invalid token") {
      status = 401;
      message = "Not Authorized";
    }

    res.status(status).json(message);
  }
}

module.exports = Middleware;
