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
                // res.status(401).json({
                //     message: "wrong email/password"
                // })
            } else if (!comparePassword(payload.password, user.password)) {
                // res.status(401).json({
                //     name: "wrong email/password"
                // })
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
            // res.status(500).json(err)
        }
    }



    static googleLogin(req, res, next) {
        // verify token 
        // dapetin token dari client 
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        // verify token
        // dapetin token dari client id
        // kita harus balikin token seperti login biasa 
        // supaya ketika login pakai google, user nya tetep lolos
        // pakai authentication server kita


        // ketentuannya yang random password
        // user yang login pakai email google ketika login biasa tidak bisa

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

        }).then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email
            console.log(payload, "<<< ini payload dari data google");
            return User.findOne({
                where: { email }
            })
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }).then(user => {
            if (user) {
                // bakal generate token, kalo tidak ada create usernya
                return user
            } else {
                let objUser = {
                    email, // ngambil email dari line 84
                    password: "random"
                }
                return User.create(objUser)
            }
        })
            .then(dataUser => {
                // bakal generate token (jika sudah)
                let access_token = signToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json(access_token)
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = userController