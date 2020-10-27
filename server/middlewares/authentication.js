const { JsonWebToken } = require('../helpers/helper')
const { User } = require('../models/')

async function authentication(req, res, next) {
  const token = req.headers.token
  try {
    if (!token) {
      throw { msg: 'Authentication Failed', status: 401 }
    } else {
      const decoded = JsonWebToken.verifyToken(token)
      const user = await User.findOne({
        where: { email: decoded.email }
      })
      if (!user) {
        throw { msg: 'Authentication Failed', status: 401 }
      } else {
        req.loginCredential = decoded
        next()
      }
    }
  } catch (err) {
    const status = err.status || 500
    const msg = err.msg || 'Internal Server Error'
    res.status(status).json({ error: msg })
  }
}

module.exports = authentication