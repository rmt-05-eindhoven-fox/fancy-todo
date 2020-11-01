const { User, Project, User_Project } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library')
const { Op } = require("sequelize");

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      }
      const newUser = await User.create(payload);

      const payload2 = {
        name: "Personal",
        UserId: newUser.id,
      }
      const newData = await Project.create(payload2)
      const userProject = await User_Project.create({
        UserId: newUser.id,
        ProjectId: newData.id
      })
      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const option = {
        where: { email: payload.email }
      }

      const user = await User.findOne(option)
      if (!user) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else if (!comparePassword(payload.password, user.password)) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else {
        const accessToken = signToken({
          id: user.id,
          email: user.email
        })
        const option2 = {
          where: {
            [Op.and]: [{ name: "Personal" }, { UserId: user.id }]
          }
        }
        const data = await Project.findOne(option2)
        const UserProjectId = data.id
        res.status(200).json({ accessToken, UserProjectId })
      }
    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next) {
    let { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let payload;
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        const option = {
          where: { email: payload.email }
        }
        return User.findOne(option)
      })
      .then(user => {
        if (user) {
          return user
        } else {
          const newUser = {
            email: payload.email,
            password: process.env.CLIENT_PASSWORD
          }
          return User.create(newUser)
        }
      })
      .then(data => {
        const accessToken = signToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json(accessToken)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController