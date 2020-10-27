const {
  verifyToken
} = require('../helpers/jwt')
const {
  User
} = require('../models/')

async function authectication(req, res, next) {
  const {
    token
  } = req.headers
  try {
    if (!token) {
      throw {
        msg: 'Authentication failed',
        status: 401
      }
    } else {
      const decoded = verifyToken(token)
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if (!user) {
        throw {
          msg: 'Authentiaction failed',
          status: 401
        }
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  } catch (error) {
    const status = error.status || 500
    const msg = err.msg || 'Internal Server Error'
    res.status(status).json({
      error: msg
    })
  }
}

module.exports = authectication