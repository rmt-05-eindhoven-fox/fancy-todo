const { Todo } = require("../models/index");

async function authorization(req, res, next) {
  try {
    let id = +req.params.id;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw { msg: `Error not found!`, status: 404 };
    } else if (todo.UserId === req.userLoggedIn.id) {
      next();
    } else {
      throw { msg: `Not authorized!`, status: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;