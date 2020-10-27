const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(request, response, next){
    const { token } = request.headers;
    try {
        if(!token){
            throw { msg: 'Authentication Failed', status: 401 }
        } else {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!user){
                throw { msg: 'Authentication Failed', status: 401}
            } else {
                request.loggedInUser = decoded;
                next();
            }
        }
    } catch (err) {
        response.status(500).json({msg: 'Internal Server Error'});
    }
}

module.exports = authentication;