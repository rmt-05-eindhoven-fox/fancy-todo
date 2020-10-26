const bcrypt = require('bcryptjs')


function encode(password){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash
}

function comparePassword(inputPassword, hashedPassword){
  return bcrypt.compareSync(inputPassword, hashedPassword)
}

module.exports = { encode, comparePassword }
