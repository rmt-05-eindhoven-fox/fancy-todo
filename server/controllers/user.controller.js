const { User } = require("../models/index")
const { comparePassword } = require("../helpers/password.helper")
const { signToken } = require("../helpers/jwt.helper")
const {OAuth2Client} = require('google-auth-library');

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
                msg: "register success"
            })


        } catch (err) {
            console.log(err, "<<<< ERROR REGISTER")
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
                throw { name: "wrong email/password"}
            } else if (!comparePassword(payload.password, user.password)) {
                throw { name : "wrong email/password"}
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ access_token })
            }
        } catch (err) {
            console.log("<<<ERROR USER", err)
            next(err)
        }
    }



    static googleLogin(req, res, next) {

        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID

        }).then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email
            console.log(payload, "<<< ini payload dari data google");
            return User.findOne({
                where: { email }
            })

        }).then(user => {
            if (user) {
                return user
            } else {
                let objUser = {
                    email, 
                    password: "random"
                }
                return User.create(objUser)
            }
        })
            .then(dataUser => {
               
                let access_token = signToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json(access_token)
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = userController