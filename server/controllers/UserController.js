const { User } = require('../models/index')
const { checkPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios')

class UserController {
  static register(req, res, next) {
    let { email, password, image_url } = req.body
    if (image_url === 'random-cats' || !image_url || image_url === '') {
      axios({
        url: 'https://api.thecatapi.com/v1/images/search',
        method: 'get'
        // ,headers: {
          // 'x-api-key': 'ba4fa836-96d2-46e5-b3a5-2b4f1c520381'
        // }
      })
      .then(picture => {
        image_url = picture[0].url
      })
      .catch(error => {
        // default apabila internet sedang down
        console.log(error);
        image_url = 'https://cdn2.thecatapi.com/images/8ik.jpg'
        // next(error)
      })
    }
    const payload = {
      email,
      password,
      image_url
    }
    User.create(payload)
    .then(data => {
      res.status(201).json({email: data.email, id: data.id, image_url: data.image_url})
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const payload = {
      email,
      password
    }
    const options = {
      where: { email: email }
    }
    User.findOne(options)
    .then(user => {
      if (!user) {
        throw { msg: 'email/password is wrong!', status: 400 }
      } else if (!checkPassword(payload.password, user.password)) {
        throw { msg: 'email/password is wrong!', status: 400 }
      }
      else {
        const accessToken = signToken({ email: user.email, id: user.id, image_url: user.image_url })
        res.status(200).json({ access_token: accessToken })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static loginGoogle(req, res, next){
    // verify token
    const { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email
    let image_url
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      // console.log(payload, '<<<<<<');
      image_url = payload.picture
      email = payload.email
      return User.findOne({where: { email: email} } )
    })
    .then(user => {
      if (user) {
        return user
      } else {
        let userObj = {
          email: email,
          password: 'rahasia',
          image_url: image_url
        }
        return User.create(userObj)
      }
    })
    .then(newUser => {
      const access_token = signToken({ email: newUser.email, id: newUser.id })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = UserController