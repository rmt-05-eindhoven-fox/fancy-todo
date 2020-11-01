const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async signup(req,res,next){
        let { email, password } = req.body;
        
        const newUser = {
            email, password
        }
        try { 
            const data = await User.create(newUser)
            // res.status(201).json(data)
            res.status(201).json({
                id : data.id, 
                email: data.email, 
                msg : "register succes"
            })
            
        } catch (err){
            next(err)
        }
    }

    static async login(req, res, next){
        try { 
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (!user) { 
                throw {message: 'wrong email/password'}
                // res.status(401).json({
                //     message: 'Wrong email/password'
                // })
            }
            else if (!comparePassword(req.body.password, user.password)){ 
                throw {message: 'wrong email/password'}
                // res.status(401).json({
                //     message: 'Wrong email/password'
                // })
            } else {
                const token = signToken({
                    id: user.id,
                    email: user.email
                })

                res.status(200).json({token});
            }
        } catch (err){
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        let { google_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);
        verify()
        async function verify() {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: google_token,
                    audience: process.env.CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const user = await User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                if (!user) {
                    user = await User.create({
                        email: payload.email,
                        password: google_token
                    })
                }
                let accessToken = signToken({ id: user.id, email: user.email })
                res.status(200).json({ accessToken })
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = UserController;