const { User } = require('../models/index');
const { comparePassword } = require('../helper/bcrypt.js');
const { signToken } = require('../helper/jwt.js');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register (req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload);

      res.status(201).json({
        id: user.id,
        email: user.email
      });

    } catch (err) {
      next(err);
    }
  }

  static async login (req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        throw { message: 'wrong email or password', status: 401 }

      } else if (!comparePassword(payload.password, user.password)) {
        
        throw { message: 'wrong email or password', status: 401 }
      }
      else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });

        res.status(200).json({
          access_token
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static googleLogin (req, res, next) {
    //verify token
    const google_access_token = req.body.google_access_token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = '';
    //verify berdasarkan client id
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email;
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(user => {
      if (user) {
        //generate token
        return user;
      }
      else {
        //create user
        //user login with google generate random password
        const userObj = {
          email: email,
          password: 'random'
        }
        return User.create(userObj)
      }
    })
    .then(data => {
      const access_token = signToken({
        id: data.id,
        email: data.email
      })
      return res.status(200).json({
        access_token
      })
    })
    .catch((err) => {
      next(err);
    })
  }

  static logout (req, res) {
    //
  }
}

module.exports = UserController;