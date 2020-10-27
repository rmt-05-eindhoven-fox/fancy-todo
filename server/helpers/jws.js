const jwt = require('jsonwebtoken');

function hashToken(payload){
    let token = jwt.sign(payload, process.env.SECRET);
    return token;
}

function verifyToken(payload, key){
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {hashToken, verifyToken}