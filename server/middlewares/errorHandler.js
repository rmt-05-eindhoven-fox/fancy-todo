function errorHandler (err, req, res, next) {
    console.log(err,  ' <<<<<< error handler check');
    let statusCode = 500
    let errors = []
    let msg = err.name || 'internal server error'

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            err.errors.forEach(i => {
                errors.push(i.message)
            });
            statusCode = 400
            break;
        case 'JsonWebTokenError':
            errors.push('Doesnt recognize User!')
            statusCode = 401
            break;
        case 'BadRequest':
            errors.push(err.message)
            break;
        default:
            errors.push(err.message)
            statusCode = err.statusCode || 500
            break;
    }
    res.status(statusCode).json({errors})

}

module.exports = errorHandler