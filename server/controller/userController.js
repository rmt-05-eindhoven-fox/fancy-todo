const { User } = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {signToken} = require("../helpers/jwt")

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      
      const register = await User.create(payload)
      res.status(201).json({msg:`register success`})
    }
    catch(error){
      next(error)
    }
  }

  static async login(req, res,next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({
        where:{email:payload.email}
      })

      if (!user){
        throw {name: "WrongUserPassword"}
      }else if(!comparePassword(payload.password,user.password)){
        throw {name: "WrongUserPassword"}
      }else{
        const access_token = signToken({
          id: user.id,
          email:user.email
        })
        res.status(200).json({access_token})
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController