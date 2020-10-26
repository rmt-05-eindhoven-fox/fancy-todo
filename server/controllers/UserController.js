const {User} = require('../database/models')

// Import helpers
const {compareHash} = require('../helper/bycrypt')
const {signToken} = require('../helper/jwt')

class UserController {
   static async register(req, res) {
      try {
         const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
         }

         const user = await User.create(newUser)

         res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
         })
      } catch (err) {
         res.status(500).json(err)
      }
   }

   static async login(req, res) {
      try {
         const loginInfo = {
            email: req.body.email,
            password: req.body.password
         }

         const userInfo = await User.findOne({
            where: {
               email: loginInfo.email
            }
         })

         if(!userInfo) {
            res.status(400).json({ 
               message: "Email / password didn't match :(" 
            });
         }
         else if(!compareHash(loginInfo.password, userInfo.password)) {
            res.status(400).json({ 
               message: "Email / password didn't match :(" 
            });
         }
         else {
            const access_token = signToken({
               id: userInfo.id,
               username: userInfo.username,
               email: userInfo.email
            })

            res.status(200).json({
               access_token
            })
         }
      } catch (err) {
         res.status(500).json(err)
      }
   }
}

module.exports = UserController