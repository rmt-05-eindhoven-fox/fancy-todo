const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password,salt)
}

const comparePassword = (password, hashPass) => {
  return bcrypt.compareSync(password, hashPass)
}

module.exports = { hashPassword, comparePassword }