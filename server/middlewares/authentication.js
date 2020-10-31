const { JsonWebToken } = require('../helpers/helper')
const { User } = require('../models/')

async function authentication(req, res, next) {
  const token = req.headers.token
  try {
    if (!token) {
      throw { message: 'Authentication Failed', status: 401 }
    } else {
      const decoded = await JsonWebToken.verifyToken(token)
      const user = await User.findOne({
        where: { email: decoded.email }
      })
      if (!user) {
        throw { message: 'Authentication Failed', status: 401 }
      } else {
        req.loginCredential = decoded
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication