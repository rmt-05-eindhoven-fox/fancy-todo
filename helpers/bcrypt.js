const bcrypt = require('bcryptjs')

hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hash = bcrypt.hashSync(password, salt)
    
    return hash
}

comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword
}