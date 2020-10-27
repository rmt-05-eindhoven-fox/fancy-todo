const { User } = require('../models/')
const { Bcrypt, JsonWebToken } = require('../helpers/helper')

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const register = await User.create(payload)
      res.status(201).json({
        id: register.id,
        email: register.email
      })
    } catch (err) {
      err.status = 400
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: { email: payload.email }
      })

      const token = JsonWebToken.signToken({
        id: user.id,
        email: user.email
      })

      res.status(200).json({ token })
    } catch (err) {
      err.status = 401
      next(err)
    }
  }
}

module.exports = UserController