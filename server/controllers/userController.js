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

    // incomplete, continue later

    // static googleLogin(req, res, next) {
    //   let {google_access_token} = req.body
    //   let email;

    //   const client = new OAuth2Client(process.env.CLIENT_ID);
    //   async function verify() {
    //     const ticket = await client.verifyIdToken({
    //         idToken: google_access_token,
    //         audience: process.env.CLIENT_ID,
    //     });
    //     const payload = ticket.getPayload();
    //     email = payload.email
    //     const user = await User.findOne({
    //       where: {
    //         email: payload.email
    //       }
    //     })

    //     if (user) {

    //     } else {
    //       var userObj = {
    //         email,
    //         password: 
    //       }
    //       return User.create(userObj)
    //     }
    //     // const userid = payload['sub'];
    //     // console.log(payload)
    //   }
    //   verify().catch(console.error);
    // }
}

module.exports = UserController