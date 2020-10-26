const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign(payload, 'griffin');
    return token;
}

module.exports = {
    signToken
};