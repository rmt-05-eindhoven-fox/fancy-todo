const { User, Todo } = require ('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
   // Register & Login //
  static async postUserRegister(req, res, next) {
  try {
    const { email, password } = req.body
    
    const newUser = await User.create({
        email, password, createdAt : new Date(), updatedAt : new Date()
    })

    const output = {
        id : newUser.id,
        email : newUser.email
    }

    res.status(201).json(output)

  } catch (error) {
    next(error)
  }
  }


  static async postUserLogin(req, res, next) {
    try {
      const { email, password } = req.body
      
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