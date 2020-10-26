const {User} = require('../models');


class UserController {
    static async register (req,res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.create(payload)
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login (req,res) {

    }
}

module.exports = UserController