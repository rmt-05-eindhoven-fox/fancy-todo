const { Todo } = require("../models")

function authorization(req, res, next) {
  Todo.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        throw { name: "Todo Not Found", status: 404 }
      } else if (data.UserId === req.loggedInUser.id) {
        next()
      } else {
        throw { name: "Not Authorized", status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization