const jwt = require('jsonwebtoken')

function signToken(dataObj) {
    const token = jwt.sign(dataObj, 'Adadeh')
    return token
}

module.exports = {
    signToken
}