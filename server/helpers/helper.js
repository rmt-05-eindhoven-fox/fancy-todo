const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Bcrypt {
  static hashPassword(pass) {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
  }

  static comparePassword(pass, hash) {
    return bcrypt.compareSync(pass, hash)
  }
}

class JsonWebToken {
  static signToken(payload) {
    const token = jwt.sign(payload, process.env.KEY)
    return token
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.KEY)
    return decoded
  }
}

module.exports = { Bcrypt, JsonWebToken }