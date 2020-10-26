const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return token = jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = generateToken