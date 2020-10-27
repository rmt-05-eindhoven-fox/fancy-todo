const { comparePassword} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { Todo, User } = require('../models/index')

class HomeController {
  static async home(req, res) {
    res.status(200).json({
      message: "Welcome to Your Fancy To Do List!"
    })
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body

      const userObj = { email, password }
      const user = await User.create(userObj, {
        individualHooks: true })
      res.status(201).json({
        id:user.id,
        email:user.email,
        msg:'Register success!'
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email }
      })

      if(!user) throw { 
        message: 'Incorrect email or password',
        statusCode: 400
      }

      if(!comparePassword (password, user.password)) throw {
        message: 'Incorrect email or password',
        statusCode: 400
      }

      const token = generateToken({
        id:user.id,
        email:user.email,
      })

      res.status(200).json({ token })
  } catch (err) {
    next(err)
   }
  }

}

module.exports = HomeController