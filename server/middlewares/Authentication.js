const { verifyToken } = require('../helpers/jws');
const { User } = require('../models/index');

async function authentication(req, res, next){
    try {
        let {access_token} = req.headers;
        if(!access_token){
            throw {message: "Authentication Failed", status:401};
        } else {
            const userDecoded = verifyToken(access_token);
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