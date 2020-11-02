const { verifyToken } = require("../helpers/jwt.helper")
const { User } = require("../models/index")

async function authenctication(req, res, next) {
    try {
        const { token } = req.headers
        console.log(token);
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

    }
}

module.exports = authenctication