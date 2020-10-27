const { request } = require("express");

const jwt = require("jsonwebtoken");

function loginToken(payload){
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
}

module.exports = {
    loginToken
}
