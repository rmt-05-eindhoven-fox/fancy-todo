const user = require('../models/index').user
const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/jwt').generateToken
const response = require("../helpers/response")

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
                    res.status(409).json(response.onFailed("email already exists"))

                user.create({
                    email:email,
                    password:password,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .then((dataUser) => {
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
                        res.status(401).json(response.onFailed("invalid email"))
                    }
                    const samePassword = bcrypt.compareSync(password, dataUser.password)
                    if(!samePassword) {
                        res.status(401).json(response.onFailed("invalid password"))
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
}

module.exports = UserController 