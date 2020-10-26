var jwt = require('jsonwebtoken');

function generateToken(payloads) {
  const token = jwt.sign(JSON.stringify(payloads), process.env.PRIVATE_KEY, {
    expiresIn: 86400 // token kadaluwarsa selama 24 jam
 });
  return token;
}

module.exports = {
  generateToken
};