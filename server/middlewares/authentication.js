const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next){
    const { token } = req.headers;
    try {
        if(!token){
            throw { msg: `Authentication failed`, status: 401 }
        } else {
            const decoded = verifyToken(token)
            const result = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!result){
                throw { msg: `Authentication failed`, status: 401 }
            } else {
                req.isSignedIn = decoded
                next()
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authentication