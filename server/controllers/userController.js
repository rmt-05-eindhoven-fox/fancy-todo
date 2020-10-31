const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  // static async register(req, res) {
  //   try {
  //     const payload = {
  //       email: req.body.email,
  //       password: req.body.password
  //     }

  //     const user = await User.create(payload)

  //     res.status(201).json({
  //       id: user.id,
  //       email: user.email,
  //       msg: 'success'
  //     })
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }
  static register(req, res) {
    const { email, password } = req.body
    // if (!email || !password) {
    //   throw (`email:(${email}), password:(${password})`)
    // }
    // console.log({ email, password })
    User
      .create({
      email, password 
    })
      .then(data => {
        let { id, email } = data
        res.status(201).json({ id, email })        
        return User.findAll()
      })
      .then(data => {
        data = data.map(el => {
          return {
            email: el.email,
            password: el.email
          }
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        // res.status(401).json({
        //   message: `Wrong email/password!`
        // })
        next({
          name: `Wrong email/password!`,
          status: 401
        })
      } else if (!comparePassword(password, user.password)) {
        // res.status(401).json({
        //   message: 'Wrong email/password!'
        // })
        next({
          name: `Wrong email/password!`,
          status: 401
        })
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })

        res.status(200).json({
          access_token
        })
      }
    } catch (error) {
      // res.status(500).json(error)
      next(error)
    }
  }

  // static login(req, res) {
  //   const { email, password } = req.body
  //   User
  //     .findOne({
  //     where: {
  //       email: email
  //     } 
  //   })
  //     .then(data => {
  //       res.status(200).json(data)        
  //     })
  //     .catch(err => {
  //       res.status(500).json(err)
  //     })
  // }

  static googleLogin(req, res, next) {
    // verify token
    // dapetin token dari client
    let {id_token} = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email = ''
    // verify google token berdasarkan client id
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(tiket => {
      const payload = tiket.getPayload();
      // console.log(tiket)
      // console.log(payload)
      // balikin token seperti login biasa agar saat login pakai google user tetap lolos authentication server
      email = payload.email
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
      .then(user => {
        if (user) {
          return user
        } else {
          let userObj = {
            email,
            password: 'randomaja'
          }
          return User.create(userObj)
        }
      })
      .then(dataUser => {
        // console.log(dataUser)
        const access_token = signToken({
          id: dataUser.id,
          email: dataUser.email
        })
        res.status(200).json({access_token})
      })
      .catch(err => {
      console.log(err)
    })
  }
}

module.exports = UserController