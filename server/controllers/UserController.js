const { User } = require('../models/index')
const { checkPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    const payload = {
      email,
      password
    }
    User.create(payload)
    .then(data => {
      res.status(201).json({email: data.email, id: data.id})
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const payload = {
      email,
      password
    }
    const options = {
      where: { email: email }
    }
    User.findOne(options)
    .then(user => {
      if (!user) {
        throw { msg: 'email/password is wrong!', status: 400 }
      } else if (!checkPassword(payload.password, user.password)) {
        throw { msg: 'email/password is wrong!', status: 400 }
      }
      else {
        const accessToken = signToken({ email: user.email, id: user.id })
        res.status(200).json({ accesstoken: accessToken })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController