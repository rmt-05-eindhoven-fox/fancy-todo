const { User } = require('../models')

const {comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {

    // Register, Login
    static async register(req, res, next) {
      try {
        const credentials = {
          email: req.body.email,
          password: req.body.password
        }
  
        const user = await User.create(credentials)
  
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      } catch (error) {
        next(error)
      }
    }
  
    static async login(req, res, next) {
      try {
        const credentials = {
          email: req.body.email,
          password: req.body.password
        }
  
        const user = await User.findOne({
          where: {
            email: credentials.email
          }
        })
  
        if (!user) {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        } else if (!comparePassword(credentials.password, user.password)) {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        } else {
          const access_token = signToken({
            id: user.id,
            email: user.email
          })
  
          res.status(200).json({
            access_token
          })
        }
      } catch (error) {
        next(error)
      }
    }
}

module.exports = UserController