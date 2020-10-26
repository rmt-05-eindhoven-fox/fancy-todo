const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class UserController {
    
    static async signup(req, res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            }

            const user = await User.create(payload);
            
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            res.status(500).json(err)
        } 
    }

    static async signin(req, res) {
        try {
            const payload = {
                email : req.body.email,
                password : req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    username: user.username
                })

                res.status(200).json({
                    access_token
                })
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController