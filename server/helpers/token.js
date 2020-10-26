const jwt = require('jsonwebtoken');

const token = (payload) => {
  const token = jwt.sign(payload, 'batak');
  return token;
}

module.exports = {
  token
}