const { verifyToken } = require('../helpers/jws');
const { User } = require('../models/index');

function authentication (req, res, next){
    let { token } = req.headers;

    if(!token){
        throw { error: "Authentication failed", status: 401 };
    } else {
        const userDecoded = verifyToken(token);
        console.log(userDecoded);
        next();
    }
}

module.exports = authentication;