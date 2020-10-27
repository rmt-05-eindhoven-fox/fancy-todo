const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, 'secret')
}

const verifyToken = (token) => {
  return jwt.verify(token, 'secret')
}

module.exports = { generateToken, verifyToken }