const { User } = require('../models/')
const { Bcrypt, JsonWebToken } = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const register = await User.create(payload)
      res.status(201).json({
        id: register.id,
        email: register.email
      })
    } catch (err) {
      err.status = 400
      next(err)
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
        throw ({ message: "Wrong email/password!", status: 404 })
      } else if (!Bcrypt.comparePassword(payload.password, user.password)) {
        throw ({ message: "Wrong email/password!", status: 401 })
      } else {
        const token = JsonWebToken.signToken({
          id: user.id,
          email: user.email
        })
        req.loginCredential.id = user.id
        req.loginCredential.token = token
        res.status(200).json({ token, id: user.id })
      }
    } catch (err) {
      err.status = 401
      next(err)
    }
  }

  static googleLogin(req, res, next) {
    let { id_token } = req.body
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const client = new OAuth2Client(CLIENT_ID);
    verify()
    async function verify() {
      try {
        const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const user = await User.findOne({
          where: {
            email: payload.email
          }
        })
        if (!user) {
          user = await User.create({
            email: payload.email,
            password: id_token
          })
        }
        let token = JsonWebToken.signToken({ id: user.id, email: user.email })
        res.status(200).json({ token, id: user.id })
      } catch (err) {
        err.status = 401
        next(err)
      }
    }
  }
}

module.exports = UserController