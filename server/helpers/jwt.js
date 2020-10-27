const jwt = require('jsonwebtoken')

module.exports = class JWT {
  static create(data) {
    return jwt.sign(data, process.env.VERIFYSIGNATURE)
  }
  static compare(data) {

  }
}