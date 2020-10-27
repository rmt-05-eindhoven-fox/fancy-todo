const createError = require('http-errors');
const { match } = require('../helper/bycript');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {

  static register(req, res, next) {
    const { username, email, password } = req.body;
    const input = { username, email, password };
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
            const { id, username, email } = user;
            const jwt = generateToken({
              id, username, email
            });
            res.status(200).json({ accessToken: jwt });
          }
        }
      }).catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;