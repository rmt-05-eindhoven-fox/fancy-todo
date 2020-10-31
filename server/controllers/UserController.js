const { User } = require('../models/index')
const { hashPassword, checkPassword } = require('../helpers/bcrypt');
const { hashToken } = require('../helpers/jws');

class Controller {
    static async register (req, res, next){
        try {
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            let user = await User.create(payload);
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (err){
            next(err)
        }
    }

    static async login (req, res, next){
        try {
            const payload = {
                username: req.body.username,
                password: req.body.password
            }
            let user = await User.findOne({where:{username: payload.username}});
            if(!user){
                next({message:"Wrong username/password", status: 401})
            } else if(!checkPassword(payload.password, user.password)) {
                next({message:"Wrong username/password", status: 401});
            } else {
                let access_token = hashToken({id: user.id, email: user.email})
                res.status(200).json({token: access_token})
            }
        } catch (err){
            next(err);
        }
    }
}
module.exports = Controller