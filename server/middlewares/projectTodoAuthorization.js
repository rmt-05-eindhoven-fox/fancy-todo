const { User_Project } = require('../models')
const { Op } = require("sequelize");

function projectTodoAuthorization(req, res, next) {
  const { id } = req.params;
  const option = {
    where: {
      [Op.and]: [{ ProjectId: id }, { UserId: req.loggedInUser.id }]
    }
  }
  User_Project
    .findOne(option)
    .then(data => {
      if (!data) {
        throw { msg: 'Project not found or you are not authorized to see this project', status: 404 }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = projectTodoAuthorization