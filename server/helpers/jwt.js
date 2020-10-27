const { request } = require("express");

const jwt = require("jsonwebtoken");

function loginToken(payload){
    const token = jwt.sign(payload, 'squirtle');
    return token;
}

module.exports = {
    loginToken
}
