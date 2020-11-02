const Helper = require("../helpers/helper");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;

    User.create({
      email: email,
      password: password,
    })
      .then((data) => {
        res.status(201).json({ id: data.id, email: data.email });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((data) => {
        if (data == null)
          throw { message: "Wrong email or password", status: 401 };
        else if (!Helper.comparePassword(password, data.password))
          throw { message: "Wrong email or password", status: 401 };
        else {
          const accessToken = Helper.signToken({
            id: data.id,
            email: data.email,
          });
          res.status(200).json({ accessToken });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const { googleToken } = req.body;
    const googleClientId = new OAuth2Client(process.env.CLIENT_ID);
    let email = "";

    googleClientId
      .verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        email = payload.email;

        return User.findOne({
          where: {
            email: payload.email,
          },
        });
      })
      .then((user) => {
        if (user) {
          return user;
        } else {
          let userObj = {
            email,
            password: "randomae",
          };
          return User.create(userObj);
        }
      })
      .then((userData) => {
        const accessToken = Helper.signToken({
          id: userData.id,
          email: userData.email,
        });
        return res.status(200).json({ accessToken });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
