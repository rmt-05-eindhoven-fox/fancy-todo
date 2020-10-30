const verifyToken = require('../helpers/jwt').verifyToken
const user = require('../models/index').user

async function authentication(req, res, next) {
    let { token } = req.headers
    try {
        if(!token){
            throw { message: "authentication failed"}
        }
        else{
            let decoded = verifyToken(token)
            let dataUser = await user.findOne({
                where: { email: decoded.email }
            })            
            if(!dataUser) throw { message: "authentication failed"}
            else{
                req.loggedInUser = decoded
                next()
            }
        }
    } catch (err) {
        next(err)
    }    
}

module.exports = authentication 