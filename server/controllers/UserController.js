const { User } = require('../models')
const { validatingPassword } = require('../helpers/bcrypt')
const generateToken = require('../helpers/jwt')

class UserController {
    static async signup(req, res) {
        const { email, password } = req.body

        try {
            const result = User
            .create()
            res.status(201).json({
                id: result.id,
                email: result.email
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    static async signin(req, res) {
        const { email, password } = req.body

        try {
            const result = await User.findOne({
                where: {
                    email
                }
            })

            if(!result){
                res.status(401).json({
                    msg: 'Wrong email/password'
                })
            } else if(!validatingPassword(password, result.password)){
                res.status(401).json({
                    msg: 'Wrong email/password'
                })
            } else {
                const access_token = generateToken({
                    email
                })
                res.status(200).json({access_token})
            }
        } catch (error) {
            if(error.name === "Sequelize Validation Error"){
                let message = []
                error.errors.forEach(el => {
                    message.push(el.message)
                })
                res.status(400).json(message.join(', \n'))
            } else{
                res.status(500).json(error)
            }
        }
    }
}

module.exports = UserController