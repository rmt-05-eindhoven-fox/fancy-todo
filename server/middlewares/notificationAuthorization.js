const { Notification } = require('../models')

function notificationAuthorization(req, res, next) {
  const { id } = req.params;
  Notification
    .findByPk(id)
    .then(data => {
      if (!data) {
        throw { msg: 'Notification not found', status: 404 }
      } else if (data.UserId === req.loggedInUser.id) {
        next()
      } else {
        throw { msg: 'Not authorized', status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = notificationAuthorization