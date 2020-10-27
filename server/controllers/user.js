const { User } = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const JWT = require('../helpers/jwt')

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body
      let created = await User.create({email, password}, { returning: true })
      res.status(201).json({ id: created.id, email: created.email })
    } catch (err) {
      next({ msg: err.errors[0].message, status: 400 })
    }
  }
  static async login(req, res, next) {
    try {
      let user = await User.findOne({ where: { email: req.body.email }})
      if(!user) next({msg: `Username/Password error`, status: 400})
      else if(user) {
        let hasil = Bcrypt.compare(req.body.password, user.password)
        if(!hasil) next({msg: `Username/Password error`, status: 400})
        else {
          let token = JWT.create({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ token })
        }
      }
    } catch (error) {
      next({ msg: 'Internal server error', status: 500})
    }
  }
}