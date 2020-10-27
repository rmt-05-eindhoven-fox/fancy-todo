const jwt = require('jsonwebtoken');

function hashToken(payload){
    let token = jwt.sign(payload, 'todoauth');
    return token;
}

function verifyToken(payload, key){
    return jwt.verify(token, 'shhhhh');
}

module.exports = {hashToken, verifyToken}