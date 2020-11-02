const {User} = require('../models/index')
const {verifyToken} = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw{msg: `AuthenticationFailed`, status: 401}
        } else {
            const decode = verifyToken(access_token);
            const user = await User.findOne({
                where: {
                    email: decode.email
                }
            })
            if (!user) {
                throw {msg: `AuthenticationFailed`, status: 401}
            } else {
                req.loggedInUser = decode
                next()
            }
        }
    } catch (err) {
        res.status(400).json({
            err: 'Invalid Email / Password'
        });
    }
}

module.exports = authentication;