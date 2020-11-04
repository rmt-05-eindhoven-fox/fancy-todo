const {User} = require('../database/models')
const {verifyToken} = require('../helper/jwt')

// Import helpers
const {compareHash} = require('../helper/bycrypt')
const {signToken} = require('../helper/jwt')
const {generatePassword} = require('../helper/password-generator')

const {OAuth2Client} = require('google-auth-library');

class UserController {
   static async register(req, res, next) {
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
         next(err)
         // if(err.name === 'SequelizeValidationError') {
         //    res.status(400).json({
         //       message: err.errors[0].message
         //    })
         // }
         // else {
         //    res.status(500).json(err)
         // }
      }
   }

   static async login(req, res, next) {
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
            next({
               name: "Email / password didn't match :(",
            })
            // res.status(400).json({ 
            //    message: "Email / password didn't match :(" 
            // });
         }
         else if(!compareHash(loginInfo.password, userInfo.password)) {
            next({
               name: "Email / password didn't match :(",
            })
            // res.status(400).json({ 
            //    message: "Email / password didn't match :(" 
            // });
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
         // res.status(500).json(err)
         next(err)
      }
   }

   static async googleLogin(req, res, next) {
      const id_token = req.body.id_token
      const username = req.body.username

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      try {
         const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
         })        
         
         const payload = ticket.getPayload();

         const user = await User.findOne({
            where: {
               email: payload.email
            }
         })
         
         if(!user) {
            const newUser = {
               email: payload.email,
               password: generatePassword()
            }
            
            const createUser = await User.create(newUser)

            const access_token = signToken({
               id: createUser.id,
               username: createUser.username,
               email: createUser.email
            })

            res.status(200).json({
               access_token
            })
         }

         else {
            const access_token = signToken({
               id: user.id,
               username: user.username,
               email: user.email
            })

            res.status(200).json({
               access_token
            })
         }

         // console.log(payload);
      } catch (err) {
         next(err)
      }
   }
   
   static async addDiscordUsername (req, res, next) {
      const token = req.body.token
      const username = req.body.username

      const decoded = verifyToken(token)

      try {
         const id = decoded.id
         
         const addedDiscord = {
            username
         }

         const editUser = await User.update(addedDiscord, {
            where: 
            {
               id
            },
            returning: true
         })

         res.status(200).json(editUser[1][0])
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }
   static async getUserInfo(req, res, next) {
      const id = req.loggedInUser.id
      
      try {
         const userInfo = await User.findOne({
            where: {
               id
            }
         })
         res.status(200).json({
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email
         })
      } catch (err) {
         console.log(err);
         // res.status(500).json(err)
      }
   }
   
   static async editUserInfo(req, res, next) {
      try {
         const id = +req.params.id
         
         const editedUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
         }

         const editUser = await User.update(editedUser, {
            where: 
            {
               id: id
            },
            returning: true
         })
         const sentToUser = {
            id: editUser[1][0].id,
            username: editUser[1][0].username,
            email: editUser[1][0].email
         }
         res.status(200).json(sentToUser)
         // console.log(editUser);
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }
}

module.exports = UserController