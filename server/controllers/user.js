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
      let { email, password } = req.body
      email = email.toLowerCase()
      let user = await User.findOne({ where: { email }})
      if(!user) throw {msg: `Username/Password error email`, status: 400}
      else if(user) {
        let hasil = Bcrypt.compare(password, user.password)
        if(!hasil) throw {msg: `Username/Password error password`, status: 400}
        else {
          let token = JWT.create({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ token })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}