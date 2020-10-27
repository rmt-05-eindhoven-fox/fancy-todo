const jwt = require('jsonwebtoken')

function generateToken(payload){
    console.log(process.env.JWT_KEY)
    return jwt.sign(payload, process.env.JWT_KEY)
}

module.exports = generateToken