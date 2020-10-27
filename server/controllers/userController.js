const { User } = require("../models/index.js")
const { comparePassword } = require('../helper/bcrypt.js')
const { signToken } = require("../helper/jwt.js")


class UserController {
    static register(req, res){
        const {email, password} = req.body
        User.create({
            email,
            password
        })
        .then(user => {
            res.status(201).json({
                id: user.id,
                email:user.email
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res){
        const playload = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(playload)
        User.findOne({
            where: {
                email: playload.email
            }
        })
        .then(user => {
            if(!user){
                res.status(401).json({
                    message: 'wrong email/password'
                })
            } else if (!comparePassword(playload.password, user.password)){
                res.status(401).json({
                    message: 'wrong email/password'
                })
            } else {
                const tokenAkses = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    tokenAkses : tokenAkses
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}

module.exports = UserController