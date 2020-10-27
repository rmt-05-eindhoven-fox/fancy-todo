const bcrypt = require('bcryptjs')

module.exports = class Bcrypt {
  static salt(value) {
    let salt = bcrypt.genSaltSync(Number(process.env.SALT))
    return bcrypt.hashSync(value, salt)
  }
  static compare(value, hashed) {
    return bcrypt.compareSync(value, hashed)
  }
}