const { comparePassword } = require('../helper/bcryptjs')
const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { OAuth2Client, LoginTicket } = require('google-auth-library')

class ControllerUser {

  static async getUsers(req, res) {
    try {
      const result = await User.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async postUsers(req, res, next) {
    try {
      const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      }
      const result = await User.create(newUser)
      res.status(201).json({
        userName: result.userName,
        email: result.email,
        password: result.password
      })
    } catch (error) {
      next(error)
    }
  }

  static async postLogin(req, res, next) {
    try {
      const logedInUser = {
        email: req.body.email,
        password: req.body.password
      }
      console.log(`ini data LogedIn >>>> ${logedInUser}`)
      const user = await User.findOne({
        where: {
          email: logedInUser.email
        }
      })
      console.log(user)

      if (!user) {
        throw { msg: 'wrong email/password', status: 401 }
      } else {
        const cekPassword = comparePassword(logedInUser.password, user.password)
        if (cekPassword) {
          console.log(cekPassword)
          const accessToken = getToken({
            id: user.id,
            userName: user.userName
          })
          console.log(accessToken)
          res.status(200).json({
            accessToken: accessToken,
            userName: user.userName
          })
        } else {
          throw { msg: 'wrong email/password', status: 401 }
        }
      }
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async postGoogleLogin(req, res, next) {
    const google_access_token = req.body.google_access_token
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    let userName = ""
    let payload;
    // verify google token berdasarkan client id
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        email = payload.email
        userName = payload.name
        // hasil dari payload = email, name, picture,
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
          let newUser = {
            userName: userName,
            email: email,
            password: 'random'
          }

          return User.create(newUser)
        }
      })
      .then(user => {

        let accessToken = getToken({
          id: user.id,
          email: user.email

        })
        return res.status(200).json({
          accessToken,
          userName: user.userName
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // static async patchUsers(req, res) {
  //   try {
  //     const updatedId = req.params.id
  //     const newPassword = {
  //       password: req.body.password
  //     }
  //     const result = await User.update(newPassword, {
  //       where: {
  //         id: updatedId
  //       },
  //       returning: true
  //     })
  //     res.status(200).json(result)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }

  // static async putUsers(req, res) {
  //   try {
  //     const updatedId = req.params.id
  //     const updated = {
  //       userName: req.body.username,
  //       email: req.body.email,
  //       password: req.body.password
  //     }
  //     const result = await User.update(updated, {
  //       where: {
  //         id: updated
  //       },
  //       returning: true
  //     })
  //     res.status(200).json(result)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }
}

module.exports = ControllerUser