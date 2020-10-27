const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  static hashpassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static signToken(payload) {
    const token = jwt.sign(payload, "enigmatic");
    return token;
  }
}

module.exports = Helper;
