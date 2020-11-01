const { Project, User_Project, Notification, User } = require('../models')
const { Op } = require("sequelize");

class ProjectController {
  static async findAll(req, res, next) {
    const option = {
      where: {
        UserId: req.loggedInUser.id
      },
      include: Project
    }
    try {
      const projects = await User_Project.findAll(option)
      res.status(200).json(projects)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id
    try {
      const result = await Project.findByPk(id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      UserId: req.loggedInUser.id
    }
    console.log(payload)
    try {
      const newData = await Project.create(payload)
      const userProject = await User_Project.create({
        UserId: req.loggedInUser.id,
        ProjectId: newData.id
      })
      res.status(201).json(newData)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      UserId: req.loggedInUser.id
    }
    const option = {
      where: { id: +req.params.id },
      returning: true
    }
    try {
      const editedData = await Project.update(payload, option)
      res.status(201).json(editedData[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const option = {
      where: { id: req.params.id }
    }
    try {
      const deleted = await Project.destroy(option)
      res.status(200).json({
        "msg": "project success to delete"
      })
    } catch (error) {
      next(error)
    }
  }

  static async inviteMember(req, res, next) {
    const option = {
      where: {
        [Op.or]: [{ "email": req.body.invitationInput }, { "username": req.body.invitationInput }]
      }
    }
    try {
      const user = await User.findOne(option)
      if (!user) {
        throw { msg: 'User not found', status: 404 }
      } else {
        const thisUser = await User.findByPk(req.loggedInUser.id)
        let assigner = ''
        if (thisUser.username) {
          assigner = thisUser.username
        } else {
          assigner = thisUser.email
        }
        const payload = {
          UserId: user.id,
          ProjectId: req.params.id,
          assigner
        }
        const notification = await Notification.create(payload)
        const msg = `Invitation request has been sent to ${req.body.invitationInput}, please wait until your invitation is accepted`
        res.status(201).json({
          msg
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProjectController