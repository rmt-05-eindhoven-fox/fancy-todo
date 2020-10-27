const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        const { token } = req.headers
        if(!token){
            throw {msg: 'Authentication failed', status:400}
        }
        else{
            const decoded = verifyToken(token)
            req.loggedInUser = decoded
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = authentication