const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController{
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
    static loginGoogle(req, res, next){
        const { google_token } = req.body // isinya data google-token
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let payload; 
        
        client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
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
            let payload = {id: dataUser.id, email: dataUser.email}
            let token = generateToken(payload)
            return res.status(200).json({ token })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController