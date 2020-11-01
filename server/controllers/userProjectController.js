const { User_Project, Notification } = require('../models')

class UserProjectController {
  static async add(req, res, next) {
    try {
      const notification = await Notification.findByPk(req.body.id)
      const payload = {
        UserId: notification.UserId,
        ProjectId: notification.ProjectId
      }
      const newProject = await User_Project.create(payload)
      res.status(201).json(newProject)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserProjectController