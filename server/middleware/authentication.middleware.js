const { verifyToken } = require("../helpers/jwt.helper")
const { User } = require("../models/index")

async function authenctication(req, res, next) {
    try {
        const { token } = req.headers
        if (!token) {
            throw { name: "Authentication failed"}
        } else {
            let decoded = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            console.log(user, "<<< user");
            if (!user) {
                throw { name: "Authentication failed"}
            } else { 
                console.log(req.loggedInUser, "<<<<< loggedInUser")
                req.loggedInUser  = decoded;
                next()
                console.log(req.loggedInUser, "<<<<< loggedInUser")
            }
        }
    } catch (err) {
        next(err)
        // console.log(err, "<<<< ERROR AUTHENTICATION")
        // res.status(err.status).json({err : err.msg})
    }
}

module.exports = authenctication