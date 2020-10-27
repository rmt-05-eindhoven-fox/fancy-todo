var bcrypt = require('bcryptjs');

function hashPassword(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

function checkPassword(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashPassword, checkPassword}