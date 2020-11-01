const { verifyToken } = require('../helper/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    const { token } = req.headers
    try {
        if (!token) {
            throw {
                msg: "Authentication Failed", status: 401
            }
        } else {
            const decoded = verifyToken(token)
            // console.log(decoded, "<<< decoded");
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            // console.log(user);
            if (!user) {
                throw {
                    msg: "Authentication Failed", status: 401
                }
            } else {
                // console.log(req.loggedInUser, "<<< req.loggedInUser sebelum");
                req.loggedInUser = decoded
                // console.log(req.loggedInUser, "<<< req.loggedInUser sesudah");
                next()
            }
        }
    }
    catch (err) {
        next(err)
    }
}


module.exports = authentication