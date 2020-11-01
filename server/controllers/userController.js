const {User} = require('../models');

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static async register (req,res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            //console.log(process.env.SALT)
            const user = await User.create(payload)
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login (req,res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else if(!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: `Invalid email/password`
                })
            } else {
                const tokenAcces = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({tokenAcces})
            }
        } catch (error) {
            next(error)
        }
    }

    static googleLogin(req,res, next){
        let { google_access_token } = req.body
        //console.log(google_access_token, 'ini google acces')
        //console.log(process.env.CLIENT_ID, 'ini env')
        const client = new OAuth2Client(process.env.CLIENT_ID)
        
        let email = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID, 

        }).then(ticket => {
            //console.log(ticket, 'ini ticket')
            const payload = ticket.getPayload();
            email = payload.email
            //console.log(payload);
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
                //console.log(dataUser)
                let token = signToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json({token})
            })
            .catch(err => {
                console.log(err)
                next(err);
            })  
    }   
}

module.exports = UserController