const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }

      const register = await User.create(payload)
      res.status(201).json({ msg: `register success` })
    }
    catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({
        where: { email: payload.email }
      })

      if (!user) {
        throw { name: "WrongUserPassword" }
      } else if (!comparePassword(payload.password, user.password)) {
        throw { name: "WrongUserPassword" }
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
          first_name: user.first_name
        })
        res.status(200).json({ access_token, first_name:user.first_name })
      }

    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next) {
    let { google_access_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)
    let email = '';
    let first_name;
    let last_name;
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.GOOGLE_CLIENTID
    })
    .then(data => {
      let payload = data.getPayload();
      first_name = payload.given_name;
      last_name = payload.family_name;
      email = payload.email;
      return User.findOne({ where: { email: payload.email } })
    })
    .then(user => {
      if (user) {
        return user
      } else {
        let userObj = {
          first_name,
          last_name,
          email,
          password: 'random'
        }
        return User.create(userObj)
      }
    })
    .then(dataUser => {
      let access_token = signToken({ id: dataUser.id, email: dataUser.email })
      return res.status(200).json({access_token, first_name:dataUser.first_name})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController