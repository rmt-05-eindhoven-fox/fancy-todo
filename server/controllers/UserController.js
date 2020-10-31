const user = require('../models/index').user
const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/jwt').generateToken
const response = require("../helpers/response")
const mailer = require('../helpers/mailer')
const { OAuth2Client } = require('google-auth-library');

class UserController{
    static register(req, res, next){
        try {
            const { email, password } = req.body
            user.findOne({
                where:{
                    email:email
                }
            })
            .then(data=>{
                if(data)
                    return res.status(409).json(response.onFailed("email already exists"))

                user.create({
                    email:email,
                    password:password,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .then((dataUser) => {
                        mailer.sendMail(email,"register account fancy todo","success register account")
                        res.status(201).json(response.onSuccess("success register account",dataUser))
                    })
                    .catch((err) => {
                        next(err)
                    })            

            })
        } catch (err) {
            next(err)
        }
    }

    static login(req, res, next){
        try {
            const { email, password } = req.body
            user.findOne({
                where: { email }
            })
                .then((dataUser) => {
                    if(!dataUser){
                        return res.status(401).json(response.onFailed("invalid email"))
                    }
                    const samePassword = bcrypt.compareSync(password, dataUser.password)
                    if(!samePassword) {
                        return res.status(401).json(response.onFailed("invalid password"))
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
        } catch (err) {
            next(err)
        }
    }


    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ""
        let name = ""

        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            email = payload.email
            name = payload.name
            return user.findOne({
                where: { email }
            })
        })
        .then(data => {
            if (!data) {
                let obj = {
                    name: name,
                    email: email,
                    password: "randompassword"
                }
                return user.create(obj)
            } else {
                return data
            }
        })
        .then(dataUser => {
            let token = generateToken({ id: dataUser.id, email: dataUser.email })
            return res.status(200).json({ token })
        })
        .catch(err => {
            next(err)
        })
    }


}

module.exports = UserController 