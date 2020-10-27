const { User } = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const JWT = require('../helpers/jwt')

module.exports = class UserController {
  static async register(req, res) {
    try {
      let { email, password } = req.body
      let created = await User.create({email, password}, { returning: true })
      res.status(201).json({ id: created.id, email: created.email })
    } catch (err) {
      if(err.message === "Minimal password length is 6") res.status(400).json(err.message)
      res.status(400).json(err)
    }
  }
  static async login(req, res) {
    try {
      let user = await User.findOne({ where: { email: req.body.email }})
      if(!user) throw new Error(`Username/Password error`)
      else if(user) {
        let hasil = Bcrypt.compare(req.body.password, user.password)
        if(!hasil) throw new Error(`Username/Password error`)
        else {
          let token = JWT.create({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ token })
        }
      }
    } catch (error) {
      if(error.message === `Username/Password error`) {
        throw res.status(401).json(error.message)
      }
      res.status(400).json(error)
    }
  }
}