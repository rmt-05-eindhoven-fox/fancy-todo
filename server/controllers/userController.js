const { User } = require('../models')

const {comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

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

    static googleLogin(req, res, next) {
      let {google_access_token} = req.body
      let email;

      const client = new OAuth2Client('257701925850-sj3m6v1ep7cp6dhhht0gn532r1h2sgct.apps.googleusercontent.com');
      client.verifyIdToken({
        idToken: google_access_token,
        audience: '257701925850-sj3m6v1ep7cp6dhhht0gn532r1h2sgct.apps.googleusercontent.com',
      })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: {
            email:email
          }
        })
        // console.log(payload)
      })
      .then(user => {
        if(user) {
          return user
        } else {
          return User.create({
            email:email,
            password: 'random'
          })
        }
      })
      .then(dataUser => {
        let access_token = signToken({
          id: dataUser.id,
          email: dataUser.email
        })
        res.status(200).json({access_token})
      })
      .catch(error => {
        console.log(error)
      })
    }
}

module.exports = UserController