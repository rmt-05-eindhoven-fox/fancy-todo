var jwt = require('jsonwebtoken');

function generateToken(payloads) {
  const token = jwt.sign(JSON.stringify(payloads), process.env.PRIVATE_KEY);
  return token;
}

module.exports = {
  generateToken
};