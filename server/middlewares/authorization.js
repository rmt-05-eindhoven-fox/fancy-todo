const { Todo } = require("../models/index");

async function authorization(req, res, next) {
  try {
    let id = +req.params.id;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw { msg: `Todo data is not found!`, status: 404 };
    } else if (todo.UserId === req.userLoggedIn.id) {
      next();
    } else {
      throw { msg: `Not authorized!`, status: 401 };
    }
  } catch (err) {
    const status = err.status || 500;
    const msg = err.msg || `Internal server error!`;
    res.status(status).json({ error: msg});
  }
}

module.exports = authorization;