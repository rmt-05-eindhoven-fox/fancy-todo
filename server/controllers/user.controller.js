const { User } = require("../models/index")
const { comparePassword } = require("../helpers/password.helper")
const { signToken } = require("../helpers/jwt.helper")

class userController {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(payload)
            console.log(user)
            res.status(201).json({
                id: user.id,
                email: user.email,
                name: "register success"
            })


        } catch (err) {
            console.log(err, "<<<< ERROR REGISTER")
            // res.status(500).json(err)
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if (!user) {
                throw {name : "wrong email/password"}
                // res.status(401).json({
                //     message: "wrong email/password"
                // })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    name: "wrong email/password"
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token})
            }
        } catch (err) {
            console.log("<<<ERROR USER", err)
            next(err)
            // res.status(500).json(err)
        }
    }
}

module.exports = userController