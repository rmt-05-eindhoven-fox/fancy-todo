const jwt = require('jsonwebtoken');

function signToken(params){
    const token = jwt.sign(params,  process.env.XXX);
    return token;
}

function verifyToken(token){
    const decoded = jwt.verify(token, process.env.XXX)
    return decoded;

}

module.exports = { signToken,verifyToken }; 