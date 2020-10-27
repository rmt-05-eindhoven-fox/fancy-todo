const { User } = require('../models/index')
const { hashPassword, checkPassword } = require('../helpers/bcrypt');
const { hashToken } = require('../helpers/jws');

class Controller {
    static async register (req, res){
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
            res.status(500).json(err)
        }
    }

    static async login (req, res){
        try {
            const payload = {
                username: req.body.username,
                password: req.body.password
            }
            let user = await User.findOne({where:{username: payload.username}});
            if(!user){
                res.status(401).json({error:"Wrong username/password"})
            } else if(!checkPassword(payload.password, user.password)) {
                res.status(401).json({error:"Wrong username/password"});
            } else {
                let token = hashToken({id: user.id, email: user.email})
                res.status(200).json({token})
            }
        } catch (err){
            res.status(500).json(err);
        }
    }
}
module.exports = Controller