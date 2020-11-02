const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User
      .create({
      email, password 
    })
      .then(data => {
        let { id, email } = data
        res.status(201).json({ id, email })        
      })
      .catch(err => {
        next(err)
      })
  }
  
  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        next({
          name: `Wrong email/password!`,
          status: 401
        })
      } else if (!comparePassword(password, user.password)) {
        next({
          name: `Wrong email/password!`,
          status: 401
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
    let {id_token} = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email = ''
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    })
      .then(tiket => {
      const payload = tiket.getPayload();

      email = payload.email
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
      .then(user => {
        if (user) {
          return user
        } else {
          let userObj = {
            email,
            password: 'randomaja'
          }
          return User.create(userObj)
        }
      })
      .then(dataUser => {
        const access_token = signToken({
          id: dataUser.id,
          email: dataUser.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = UserController