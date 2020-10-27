const { User } = require('../models/index.js');
const { verifyToken } = require("../helper/jwt.js");


function authentication(req, res, next){
    const { token } = req.headers; 

    if(!token){
        throw {
            msg: "authentication failed"
        }
    }else {
        const decoded  = verifyToken(token);

        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            // console.log(user)
            if(!user){
                throw {msg: "user not found"}
            } else {
                req.loggedInUser = decoded
                // console.log(req.loggedInUser)
                next()
            }
        })
        .catch(err => {
            const status = err.status || 500
            const msg   = err.msg || 'internal server error'
            res.status(status).json({error:msg})
        })
    }
}

module.exports = authentication 