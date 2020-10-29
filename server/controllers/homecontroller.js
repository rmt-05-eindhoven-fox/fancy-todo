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
  
  static googleLogin(req, res, next) {
    const { google_access_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let email = ''
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      let payload = ticket.getPayload()
      email = payload.email
      return User.findOne({ where: { email: payload.email }})
    })
    .then(user => {
      if(user){
        return user
      } else {
        var userObj = {
          email,
          password: 'randomaja'
        }
        return User.create(userObj)
      }
    })
    .then(dataUser => {
      let token = generateToken({
        id: user.id, 
        email: user.email,
      })
      return res.status(200).json({ token })
    })
    .catch(err => {
      next(err)
    })
  }
}


module.exports = HomeController
