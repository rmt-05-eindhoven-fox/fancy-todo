module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'internel server error'
    if(err.name === 'SequelizeValidationError'){
        status = 400;
        let errors = err.errors.map(x => {
            return x.message
        })
        msg = errors.join(', ')
    } else if (err.name === 'SequelizeUniqueConstraintError'){
        status = 400;
        msg = 'Email has already taken'
    } else if (err.message === 'wrong email/password'){
        status = 401;
        msg = "wrong email/password"
    }
    res.status(status).json({ msg });

}