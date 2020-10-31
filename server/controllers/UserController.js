const { User } = require('../models/index')
const { checkPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

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
        res.status(200).json({ access_token: accessToken })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static loginGoogle(req, res, next){
    // verify token
    const { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      // console.log(payload, '<<<<<<');
      email = payload.email
      return User.findOne({where: { email: email} } )
    })
    .then(user => {
      if (user) {
        return user
      } else {
        let userObj = {
          email: email,
          password: 'rahasia'
        }
        return User.create(userObj)
      }
    })
    .then(newUser => {
      const access_token = signToken({ email: newUser.email, id: newUser.id })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = UserController