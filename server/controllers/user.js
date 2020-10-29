const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');
const { use } = require('../router/user');
class UserController{
    static loginGoogle(req, res, next){
        const { google_token } = req.body
        const client = new OAuth2Client(process.env.CLIENTID);
        client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENTID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user => {
            if(user){
                return user
            }else{
                return User.create({email: payload.email, password: "random"})
            }
        })
        .then(dataUser => {
            let token = generateToken({id: dataUser.id, email: dataUser.email})
            return res.status(201).json({ token })
        })
        .catch(err => {
            next(err)
        })
    }
    static register(req, res, next){
        const { email, password } = req.body
        User.create({
            email,
            password
        })
            .then((dataUser) => {
                res.status(201).json({
                    id: dataUser.id,
                    email: dataUser.email,
                    msg: "register success"
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then((dataUser) => {
                if(!dataUser){
                    throw { msg: "invalid email or password "}
                }
                const samePassword = bcrypt.compareSync(password, dataUser.password)
                if(!samePassword) {
                    throw { msg: "invalid email or password "}
                }else{
                    let payload = {
                        id: dataUser.id, email: dataUser.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ token })
                }

            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = UserController