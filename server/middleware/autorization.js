const createError = require('http-errors');
const { Todo } = require('../models')

function todoAuthorize(req, res, next) {
  const { id } = req.params;
  Todo.findByPk(id).then((todo) => {
    if (!todo) {
      next(createError(404, 'Todo ID Not Found!'));
    } else if (todo.UserId == req.logedInUser.id) {
      next();
    } else {
      next(createError(401, 'Not authorized!'));
    }
  }).catch((err) => {
    next(err);
  });
}

module.exports = todoAuthorize;