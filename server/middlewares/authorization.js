const { ToDo } = require('../models/')

function authorization(req, res, next) {
  const id = req.params.id
  ToDo.findByPk(id)
    .then(data => {
      if (!data) {
        throw { error: 'ToDo Not Found', status: 404 }
      } else if (data.UserId == req.loginCredential.id) {
        next()
      } else {
        throw { error: 'Not Authorized', status: 401 }
      }
    })
    .catch(err => {
      console.log(err)
      const status = err.status || 500
      const error = err.error || 'Internal Server Error'
      res.status(status).json(error)
    })
}

module.exports = authorization