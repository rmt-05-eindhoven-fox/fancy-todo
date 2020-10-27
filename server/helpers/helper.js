const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  static hashpassword(password) {
    //sepertinya ada proses dari 'dotenv' yang masih perlu dipahami jika digunakan sebagai parameter. Saya mengalami masalah yaitu salt menjadi undefined ketika menggunakan 'process.env.SALT' menyebabkan register user mengalami error terus menerus (untuk sementara saya akan set default = 10)
    const salt = bcrypt.genSaltSync(saltrounds);
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

  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  }
}

module.exports = Helper;
