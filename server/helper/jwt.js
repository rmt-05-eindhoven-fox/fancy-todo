var jwt = require('jsonwebtoken');

function generateToken(payloads) {
  const token = jwt.sign(JSON.stringify(payloads), process.env.PRIVATE_KEY);
  return token;
}

function verivyToken(accessTOken) {
  const decoded = jwt.verify(accessTOken, process.env.PRIVATE_KEY);
  return decoded;
}

module.exports = {
  generateToken, verivyToken
};