const { Project } = require('../models')

function projectAuthorization(req, res, next) {
  const { id } = req.params;
  Project
    .findByPk(id)
    .then(data => {
      if (!data) {
        throw { msg: 'Project not found', status: 404 }
      } else if (data.UserId === req.loggedInUser.id) {
        if (data.name === "Personal") {
          throw { msg: 'Personal project cannot be edited or deleted', status: 401 }
        } else {
          next()
        }
      } else {
        throw { msg: 'Not authorized', status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = projectAuthorization