const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async signup(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      };

      const user = await User.create(payload);

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    try {
      if (!req.body.email) {
        throw { message: `Please input the email`, status: 401 };
      } else if (!req.body.password) {
        throw { message: `Please input the password`, status: 401 };
      }
      const payload = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        throw { message: `Invalid email/password`, status: 401 };
      } else if (!comparePassword(payload.password, user.password)) {
        throw { message: `Invalid email/password`, status: 401 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
          // username: user.username,
        });

        res.status(200).json({
          access_token,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async signinGoogle(req, res, next) {
    try {
      const google_token = req.body.google_token;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      const user = await User.findOne({ where: { email: email } });
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      } else {
        const userObj = {
          email,
          password: "random",
        };
        const newUser = await User.create(userObj);
        const access_token = signToken({
          id: newUser.id,
          username: newUser.username,
        });
        res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
