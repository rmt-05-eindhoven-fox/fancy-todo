const {verifyToken} = require("../helpers/jwt")
const {User} = require("../models/")

async function authentication(req,res,next){
  const {token} = req.headers
  try {
    if(!token){
      throw { name:"AuthenticationFailed"}
    }else{
      console.log(token)
      const decoded = verifyToken(token)
      const user = await User.findOne({
        where:{email:decoded.email}
      })
      if(!user){
        throw { name:"AuthenticationFailed"}
      }else{
        req.loggedInUser = decoded
        console.log(req.loggedInUser)
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authentication