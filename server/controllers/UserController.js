const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {

  static async register(req, res, next) {
    try {
      const {email, password} = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.create(payload);
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.findOne({ where: {email: payload.email} });
      if (!user) {
        res.status(401).json({
          msg: `Invalid email or password!`
        });
      } else if (!comparePassword(payload.password, user.password)) {
        res.status(401).json({
          msg: `Invalid email or password!`
        });
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }

}

module.exports = UserController;