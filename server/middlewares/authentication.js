const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  try{
    let { token } = req.headers
    let decoded = verifyToken(token)
    const user = await User.findOne({
      where: {
        email:decoded.email
      }
    })

    if(!user) throw {
      msg:'Authentication Failed!'
    }

    req.userData = decoded
    next()
  } catch(err) {
    next(err)
  }
}

module.exports = authentication