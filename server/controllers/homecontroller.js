const { OAuth2Client } = require('google-auth-library')
const { comparePassword} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { Todo, User } = require('../models/index')

class HomeController {
  static async home(req, res) {
    res.status(200).json({
      message: "Welcome to Your Fancy To Do List!"
    })
  }

  static register(req, res, next) {
      const { email, password } = req.body
      const userObj = { email, password }
       User.create(userObj)
       .then((user) => {
        res.status(201).json({
          id:user.id,
          email:user.email,
          msg:'Register success!'
        })
      }).catch((err) => {
        next(err)
      })
  }

  static login(req, res, next) {
    
      const { email, password } = req.body
      User.findOne({
        where: { email }
      })
      .then((user) => {
      if(!user) throw { 
        message: 'Incorrect email or password',
        statusCode: 400
      }

      if(!comparePassword (password, user.password)) throw {
        message: 'Incorrect email or password',
        statusCode: 400
      }

      const token = generateToken({
        id:user.id,
        email:user.email,
      })

      res.status(200).json({ token })
    }).catch((err) => {
      next(err)
    })
  }

  static async googleLogin(req, res, next) {
    const { google_access_token } = req.body
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
          idToken: google_access_token,
          audience: process.env.GOOGLE_CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      const { email } = payload

      let user = await User.findOne({ 
        where: { email } 
      })
      if (!user) {
        user = await User.create({ 
          email, 
          password: 'nothinglasts123'
        }, { 
          individualHooks: true 
        })
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
      })

      res.status(200).json({ token })
    } catch (err) {
      next(err)
    }

  }
}


module.exports = HomeController