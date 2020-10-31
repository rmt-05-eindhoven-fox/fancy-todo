const { User, Todo } = require ('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController{
   // Register & Login //
  static async postUserRegister(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      where : {email}
    })
    
    if(!user){
      const newUser = await User.create({
          email, password, createdAt : new Date(), updatedAt : new Date()
      })
  
      const output = {
          id : newUser.id,
          email : newUser.email
      }
  
      res.status(201).json(output)

    } else {
      res.status(400).json({
        message : 'Username already exists'
      })
    }

  } catch (error) {
    next(error)
  }
  }

  static async postGoogleLogin(req,res,next) {
    try {
      
    const googleToken = req.headers.google_access_token
    let token

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    
    let email = payload.email
    let password = 'defaultPassword'

    const user = await User.findOne({
      where : { email }
    })

    if(!user) {

      
      const newUser = await User.create({
        email, password, createdAt : new Date(), updatedAt : new Date()
      })
      

      
      token = generateToken({
        id : newUser.id,
        email : newUser.email
      })

      res.status(201).json({
        token
      })

    } else {

      token = generateToken({
        id : user.id,
        email : user.email
      })

      res.status(200).json({
        token
      })
      
    }

    } catch (error) {
      res.status(500).json({
        message : error
      })    
    }
  }

  static async postUserLogin(req, res, next) {
    try {
      let {email, password} = req.body
      
      const user = await User.findOne({
          where : { email }
      })

      if(!user){
        //user doesn't exist
        next({ status : 401, message : 'Username/password is wrong'})

      } else if (!comparePassword(password, user.password)){
        //password is wrong
        next({ status : 401, message : 'Username/password is wrong'})

      } else {
        // password is right, generate token
        const userToken = generateToken({
          id : user.id,
          email : user.email
        })
        res.status(200).json({
          token : userToken
        })
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController