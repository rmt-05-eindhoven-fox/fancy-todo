const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class UserController {
  static postRegister(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(payload)
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static postLogin(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: payload.email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "ErrorLogin" }
        } else if (!comparePassword(payload.password, data.password)) {
          throw { name: "ErrorLogin" }
        }
        const access_token = signToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController