const {
  User
} = require('../models')
const {
  comparePassword
} = require('../helpers/bcrypt')
const {
  generateToken
} = require('../helpers/jwt')

class UserController {

  static async postRegister(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body

      const newUser = await User.create({
        email,
        password,
      })

      const output = {
        id: newUser.id,
        email: newUser.email
      }

      res.status(201).json(output)

    } catch (error) {
      next(error)
    }
  }


  static async postLogin(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        res.status(401).json({
          message: 'Username/password is wrong'
        })
      } else if (!comparePassword(password, user.password)) {
        res.status(401).json({
          message: 'Username/password is wrong'
        })
      } else {
        const userToken = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token: userToken
        })
      }

    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController;