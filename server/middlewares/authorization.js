const { ToDo } = require('../models/')

function authorization(req, res, next) {
  const id = req.params.id
  ToDo.findByPk(id)
    .then(data => {
      if (!data) {
        throw { message: 'ToDo Not Found', status: 404 }
      } else if (data.UserId == req.loginCredential.id) {
        next()
      } else {
        throw { message: 'Not Authorized', status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization