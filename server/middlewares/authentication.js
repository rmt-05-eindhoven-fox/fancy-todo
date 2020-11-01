const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next){
    try {
        const { token } = req.headers;
        if(!token){
            throw { msg: 'Authentication failed', status: 401 }
        } else {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })

            if(!user){
                throw { msg: 'Authentication failed', status: 401 }
            } else {
                req.loggedInUser = decoded;
                next()
            }
        }
    } catch (err) {
        const status = err.status || 500;
        const msg = err.msg || 'Internal Server Error';
        res.status(status).json({error : msg})
    }
}

module.exports = authentication;