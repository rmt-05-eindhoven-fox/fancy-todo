const Helper = require("../helpers/helper");
const { User } = require("../models");

class UserController {
  static register(req, res) {
    const { email, password } = req.body;

    User.create({
      email: email,
      password: password,
    })
      .then((data) => {
        res.status(201).json({ id: data.id, email: data.email });
      })
      .catch((err) => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((data) => {
        if (data == null)
          res.status(401).json({ error: "Wrong email or password" });
        else if (!Helper.comparePassword(password, data.password))
          res.status(401).json({ error: "Wrong email or password" });
        else {
          const accessToken = Helper.signToken({
            id: data.id,
            email: data.email,
          });
          res.status(200).json({ accessToken });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = UserController;
