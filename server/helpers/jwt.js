const jwt = require('jsonwebtoken')

signToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET)

    return token;
}

verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET)

    return decoded
}

module.exports = {
    signToken,
    verifyToken
}