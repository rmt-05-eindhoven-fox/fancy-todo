const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('../helper/jwt')
const generateToken = require('../helper/jwt')

class UserController{
    static register(req, res){
        const { email, password } = req.body
        User.create({
            email,
            password
        })
            .then((dataUser) => {
                res.status(201).json({
                    id: dataUser.id,
                    email: dataUser.email,
                    msg: "register succes"
                })
            })
            .catch((err) => {
                res.status(401).json({
                    err: err
                })
            })
    }

    static login(req, res){
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then((dataUser) => {
                if(!dataUser){
                    throw { msg: "invalide email or password "}
                }
                const samePassword = bcrypt.compareSync(password, dataUser.password)
                if(!samePassword) {
                    throw { msg: "invalide email or password "}
                }else{
                    let payload = {
                        id: dataUser.id, email: dataUser.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ token })
                }

            })
            .catch((err) => {
                res.status(400).json({ err: err.msg || "invalid requests" })
            })
    }
}

module.exports = UserController