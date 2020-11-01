const { User } = require('../models')
const { validatingPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
            res.status(201).json({email})
        })
        .catch(err => {
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

    static googleSignin(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID,
        })
        .then(result => {
            console.log('1')
            const payload = result.getPayload();
            email = payload.email
            //const userid = payload['sub'];
            return User.findOne({where: { email }})
        })
        .then(result => {
            console.log('2')
            if(result){
                return result
            } else {
                const newData = {
                    email,
                    password : 'mskakdmkasm'
                }
                return User.create(newData)
            }
        })
        .then(result => {
            console.log('3')
            const access_token = generateToken({
                userId: result.id,
                email: result.email
            })
            res.status(200).json({access_token})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
          
    }
}

module.exports = UserController