const bcrypt = require('bcryptjs');

function hashPassword(pass) {
  let salt = bcrypt.genSaltSync(8);
  let hash = bcrypt.hashSync(pass, salt);

  return hash;
}

function comparePassword(pass, hash) {
  return bcrypt.compareSync(pass, hash);
}

module.exports = {
  hashPassword,
  comparePassword
}