const { User } = require('../models/')
const { Bcrypt, JsonWebToken } = require('../helpers/helper')

class UserController {
  static async register(req, res) {
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
      res.status(500).json(err)
    }
  }

  static async login(req, res) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: { email: payload.email }
      })

      if (!user) {
        res.status(401).json({
          msg: 'Wrong Email or Password'
        })
      } else if (!Bcrypt.comparePassword(payload.password, user.password)) {
        console.log(payload.password)
        res.status(401).json({
          msg: 'Wrong Email or Password'
        })
      } else {
        const token = JsonWebToken.signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ token })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = UserController