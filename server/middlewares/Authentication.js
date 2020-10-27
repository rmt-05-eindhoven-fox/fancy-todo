const { verifyToken } = require('../helpers/jws');
const { User } = require('../models/index');

async function authentication(req, res, next){
    try {
        let {token} = req.headers;
        if(!token){
            throw {message: "Authentication Failed", status:401};
        } else {
            const userDecoded = verifyToken(token);
            let user = await User.findOne({where:{email:userDecoded.email}});
            if(!user){
                throw {message: "Authentication Failed", status:401};
            } else {
                req.loggedIn = userDecoded;
                next();
            }
        }
    } catch (error) {
        let status = error.status || 500;
        let message = error.message || "Internal Server Error";
        res.status(status).json({error: message});
    }
}

module.exports = authentication;