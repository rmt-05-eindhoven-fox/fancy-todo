const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  static hashpassword(password) {
    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static signToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
  }
}

module.exports = Helper;
