const jwt = require('jsonwebtoken');

function signToken(params){
    const token = jwt.sign(params,  process.env.XXX);
    return token;
}

module.exports = { signToken }; 