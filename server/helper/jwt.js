const jwt = require("jsonwebtoken")

function signToken(payload){
    const token = jwt.sign (payload, "sangat rahasia")
    return token
}

module.exports = {
    signToken
}