const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const newUser = await User.create(payload);
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
        throw { msg: 'wrong email or password', status: 401 }
      } else if (!comparePassword(payload.password, user.password)) {
        throw { msg: 'wrong email or password', status: 401 }
      } else {
        const accessToken = signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ accessToken })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController