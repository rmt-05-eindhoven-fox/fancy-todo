const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
   let salt = bcrypt.genSaltSync(+process.env.SALT)
   let hash = bcrypt.hashSync(password, salt)
   return hash
}

const compareHash = (passwordInput, hash) => {

   return bcrypt.compareSync(passwordInput, hash)
}
module.exports = {hashPassword, compareHash}