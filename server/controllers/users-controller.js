const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UsersController {
    static postRegister(req, res, next){
        const { email, password } = req.body
        let newUser = {
            email,
            password
        }
        User.create(newUser)
        .then(data=>{
            res.status(201).json({id: data.id, email: data.email})
        })
        .catch(err=>{
            next(err)
        })
    }

    static postLogin(req, res, next){
        const { email, password } = req.body
        const payload = {
            email,
            password
        }
        User.findOne({
            where:{
                email: payload.email
            }
        })
        .then(user=>{
            console.log(user)
            if(!user){
                throw {msg: 'Wrong email/password', status: 400}
            }
            else if(!comparePassword(payload.password, user.password)){
                throw {msg: 'Wrong email/password', status: 400}
            }
            else{
                const access_token = signToken({
                    id : user.id,
                    email : user.email
                })
                res.status(200).json({access_token})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UsersController