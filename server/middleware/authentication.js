const { verifyToken } = require('../helper/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    let { token } = req.headers
    try {
        if(!token){
            throw { msg: "authentication gagal"}
        }
        else{
            let decoded = verifyToken(token)
            let dataUser = await User.findOne({
                where: { email: decoded.email }
            })
            if(!dataUser) throw { msg: "authentication gagal"}
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