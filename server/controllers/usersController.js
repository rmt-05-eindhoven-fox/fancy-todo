const user = require('../models/index').User
const bcrypt = require('bcryptjs')
const generateToken = require('../helper/jwt').generateToken

class UserController{
    static register(req, res, next){
        const { email, password } = req.body
        user.create({
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
                next(err)
              })
            }

    static login(req, res, next){
        const { email, password } = req.body
        user.findOne({
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
                next(err)
            })
          }
       }

module.exports = UserController 