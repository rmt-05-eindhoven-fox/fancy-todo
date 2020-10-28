const Helper = require("../helpers/helper");
const { User } = require("../models");

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
}

module.exports = UserController;
