const bcryptjs = require('bcryptjs');

function encrypt(password) {
  console.log(password)
  const salt = bcryptjs.genSaltSync(+process.env.SALT);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

function match(password, hash) {
  const match = bcryptjs.compareSync(password, hash); // true
  return match;
}

module.exports = {
  encrypt, match
}