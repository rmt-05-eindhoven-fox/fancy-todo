const { User } = require('../models/index')
const { hashPassword, checkPassword } = require('../helpers/bcrypt');
const { hashToken } = require('../helpers/jws');
const {OAuth2Client} = require('google-auth-library');

class Controller {
    static async register (req, res, next){
        try {
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            let user = await User.create(payload);
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (err){
            next(err)
        }
    }

    static async login (req, res, next){
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            let user = await User.findOne({where:{email: payload.email}});
            if(!user){
                next({message:"Wrong email/password", status: 401})
            } else if(!checkPassword(payload.password, user.password)) {
                next({message:"Wrong email/password", status: 401});
            } else {
                let access_token = hashToken({id: user.id, email: user.email})
                res.status(200).json({token: access_token})
            }
        } catch (err){
            next(err);
        }
    }

    static googleLogin (req, res, next){
            let { google_access_token } = req.body;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            let username, email = '';
            client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                 username = payload.email;
                 email = payload.email;

                return User.findOne({where: {email}})
            })
            .then(user => {
                if(user){
                    return user;
                } else {
                    let newUser = {
                        username: username,
                        email: email,
                        password: '123456789'
                    }
                    return User.create(newUser);
                }
            })
            .then(data => {
                let access_token = hashToken({id: data.id, email: data.email});
                res.status(200).json({token: access_token});
            })
            .catch(err => {
                next(err);
            })
    }
}
module.exports = Controller