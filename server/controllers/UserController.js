const createError = require('http-errors');
const { match } = require('../helper/bycript');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');

class UserController {

  static register(req, res, next) {
    const { fullname, username, email, password } = req.body;
    const input = { fullname, username, email, password };
    User.create(input)
      .then((user) => {
        res.status(200).json(user);
      }).catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { username, password } = req.body;
    // res.status(200).json({ username, password })
    User.findOne({
      where: { username }
    })
      .then((user) => {
        if (!user) {
          next(createError(401, 'Wrong Username / Password '));
        } else {
          const status = match(password, user.password);
          if (!status) {
            next(createError(401, 'Wrong Username / Password '));
          } else {
            const { id, fullname, username, email } = user; 
            const jwt = generateToken({ id, fullname, username, email });
            res.status(200).json({ accesstoken: jwt, fullname, username, email, userid: id });
          }
        }
      }).catch((err) => {
        next(err);
      });
  }

  static googlesignin(req, res, next) {
    let { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let userGoogle = {}

    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID,
    }).then(ticket => {
      const payload = ticket.getPayload();
      const { name, email, picture } = payload;
      userGoogle = { name, email, picture }

      return User.findOne({ where: { email } })
    }).then(user => {
      if (user) {
        return user
      } else {
        const newUser = {
          fullname: userGoogle.name,
          username: userGoogle.email,
          password: 'jJys8Hsk8wEmJSa',
          email: userGoogle.email
        }
        return User.create(newUser)
      }
    }).then(data => {
      console.log(data)
      const { id, fullname, username, email } = data;
      const jwt = generateToken({ id, fullname, username, email });
      res.status(200).json({ accesstoken: jwt, fullname, username, email, userid: id });
    }).catch(err => {
      next(err)
    })
  }

  static verifyToken(req, res, next) {
    res.status(200).json({ token: 'valid' });
  }
}

module.exports = UserController;