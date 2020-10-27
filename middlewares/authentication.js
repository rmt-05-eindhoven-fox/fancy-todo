const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/")


async function authentication (req, res, next) {
    const {token} = req.headers
    try {
        if (!token) {
            throw {message: `Authentication failed`, status: 401}
        } else {
            const decoded = verifyToken(token)
            const user = await User.findByPk(decoded.id)

            if (!user) {
                throw {message: `Authentication failed`, status: 401}
            } else {
                req.User = decoded
                next()
            }
        }
    } catch(err) {
        next(err)
    }
}

module.exports = authentication