const { Todo } = require("../models")

function authorization(req, res, next) {
  Todo.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        throw { name: "Not Found" }
      } else if (data.UserId === req.loggedInUser.id) {
        next()
      } else {
        throw { name: "Not Authorized" }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization