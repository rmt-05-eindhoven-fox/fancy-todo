const jwt = require('jsonwebtoken')

module.exports = class JWT {
  static create(data) {
    return jwt.sign(data, process.env.VERIFYSIGNATURE)
  }
  static compare(data, callback) {
    jwt.verify(data, process.env.VERIFYSIGNATURE, (err, payload) => {
      if(err) callback(err)
      else callback(null, payload)
    })
  }
}