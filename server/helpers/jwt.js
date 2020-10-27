const jwt = require('jsonwebtoken');

function generateToken(payload){
  const token = jwt.sign(payload, 'secret')
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, 'secret')
  return decoded
}

module.exports = { generateToken, verifyToken }