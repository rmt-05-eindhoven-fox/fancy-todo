const {User} = require('../models/index');
const {comparePass} = require('../helpers/bcryptjs');
const {generateToken} = require('../helpers/jwt');

class UsersController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const payload = await User.create({
                email,
                password
            });
            res.status(201).json({
                id: payload.id,
                email: payload.email
            });
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({
                where: {email}
            });
            if (!user) {
                res.status(401).json({
                    msg: `Invalid Email/Password`
                });
            } else if(!comparePass(password, user.password)) {
                res.status(401).json({
                    msg: `Invalid Email/Password`
                });
            } else {
                const access_token = generateToken({
                    id: user.id,
                    email: user.email
                });
                res.status(200).json({access_token});
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UsersController