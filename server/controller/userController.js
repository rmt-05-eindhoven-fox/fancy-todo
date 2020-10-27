const { User } = require("../models/index")
const { compare } = require('../helpers/bcrypt')
const signToken = require("../helpers/jwt")

class UserController {
    static signIn(req,res){
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(payload)
        .then(data => {
            res.status(201).json({
                email: data.email,
                id: data.id
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static signUp(req,res){
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(data => {
            if (!data){
                res.status(401).json({
                    message: "wrong email/password"
                })
            }
            else if(!compare(payload.password, data.password)){
                res.status(401).json({
                    message: "wrong email/password"
                })
            }
            else {
                const acces_token = signToken({
                    id: User.id,
                    email: User.email
                })
                res.status(200).json({acces_token})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController