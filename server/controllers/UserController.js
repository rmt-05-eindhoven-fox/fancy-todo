const { User } = require('../models/index')
const { checkPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { email, password } = req.body
    const payload = {
      email,
      password
    }
    User.create(payload)
    .then(data => {
      console.log(data);
      res.status(201).send(data)
    })
    .catch(error => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => {
          return err.message
        }).join(', ')
        res.status(400).send(errors)
      } else {
        res.status(500).json(error)
      }
    })
  }

  static login(req, res) {
    const { email, password } = req.body
    const payload = {
      email,
      password
    }
    const options = {
      where: {
        email: email
      }
    }

    User.findOne(options)
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: 'email/password is wrong! not found'
        })
      } else if (!checkPassword(payload.password, user.password)) {
        res.status(401).json({
          message: 'email/password is wrong!'
        })
      }
      else {
        const accessToken = signToken({ email: user.email })
        res.status(200).json({ accessToken })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = UserController