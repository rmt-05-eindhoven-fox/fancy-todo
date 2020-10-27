const verifyToken = require('../helper/jwt').verifyToken
const user = require('../models/index').User

async function authentication(req, res, next) {
    let { token } = req.headers
    try {
        if(!token){
            throw { msg: "authentication failed"}
        }
        else{
            let decoded = verifyToken(token)
            let dataUser = await user.findOne({
                where: { email: decoded.email }
            })
            if(!dataUser) throw { msg: "authentication failed"}
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