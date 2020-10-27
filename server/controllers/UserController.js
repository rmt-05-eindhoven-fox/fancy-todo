const { User, Todo } = require('../models')
const { validatingPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static signup(req, res, next) {
        const { email, password } = req.body

        User
        .create({ 
            email, 
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            returning: true
            })
        .then(result => {
            console.log('masih masuk sini')
            res.status(201).json({email})
        })
        .catch(err => {
            console.log('masuk sini')
            next(err)
        })
    }
    
    static signin(req, res, next) {
        const { email, password } = req.body
        User
        .findOne({
            where: {
                email: email
            }
        })
        .then(result => {
            if(!result){
                throw { msg: `Wrong email/password`, status: 401 }
            } else if(!validatingPassword(password, result.password)){
                throw { msg: `Wrong email/password`, status: 401 }
            } else {
                const access_token = generateToken({
                    userId: result.id,
                    email: result.email
            })
                res.status(200).json({access_token})
            }
        })
        .catch (err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController