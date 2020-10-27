const { User } = require('../models')
const { decodeToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  const token = req.headers.accesstoken
  try {
    if (!token) {
      throw { msg: 'Authentification failed', status: 401}
    } else { 
      const decoded = decodeToken(token)
      const options = {
        where: { email: decoded.email, id: decoded.id }
      }
      const user = await User.findOne(options)
      if (!user) {
        throw { msg: 'Authentification failed', status: 401}
      } else {
        req.userLoggedIn = decoded
        next()
      }
    }
  } catch (err) {
    next(err)
  }
  
}

module.exports = authentication