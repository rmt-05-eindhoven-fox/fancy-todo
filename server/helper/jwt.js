const jwt = require('jsonwebtoken')

function getToken(payLoad) { // payLoad maksudnya data yang mau di buatkan tokennya
  const token = jwt.sign(payLoad, process.env.SECRET)
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET)
  return decoded
}

module.exports = { getToken, verifyToken }