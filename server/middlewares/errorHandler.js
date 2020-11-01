module.exports = function (err, req, res, next) {
    let status = 500
    let msg = err.msg || 'internal server error'
    console.log(err)
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400;
        let message = []

        err.errors.forEach(el => {
            message.push(el.message)
        })
        msg = message.join(', ')
    }
    res.status(status).json(msg)
}