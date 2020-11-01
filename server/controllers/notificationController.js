const { Notification, Project } = require('../models')

class NotificationController {
  static async findAll(req, res, next) {
    const option = {
      where: {
        UserId: req.loggedInUser.id
      },
      include: Project
    }
    try {
      const notifications = await Notification.findAll(option)
      res.status(200).json(notifications)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete(req, res, next) {
    const option = {
      where: { id: req.params.id }
    }
    try {
      Notification.destroy(option)
      res.status(200).json({
        "msg": "notification success to delete"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = NotificationController