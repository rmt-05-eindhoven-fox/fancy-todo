const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
  try {
    const token = req.headers.token
    if (!token) {
      throw { msg: 'authentication failed', status: 401 }
    } else {
      const userLogedIn = verifyToken(token)
      const userMember = await User.findByPk(userLogedIn.id)
      if (!userMember) {
        throw { msg: 'authentication failed', status: 401 }
      } else {
        req.userLogedIn = userLogedIn // req.userLogedIn adalah propery baru yang kita buat sendiri
        console.log(req.userLogedIn)
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authentication 