const bcrypt = require('bcryptjs')

function hashingPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

function validatingPassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashingPassword, validatingPassword }