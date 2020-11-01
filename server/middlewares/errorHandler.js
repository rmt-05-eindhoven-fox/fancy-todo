function errorHandler (err, req, res, next) {
    let status;
    const name = err.name || ''
    let msg;

    switch (name) {
        case 'SequelizeValidationError':
            status = 400;
            console.log(err)
            msg = err.errors.map(el => {
                return el.message
            }).join(', ');
            break;
        case 'Authentication failed':
            status = 401,
            msg = 'Authentication failed'
            break;
        case 'Post not found':
            status = 404,
            msg = 'Post not found'
            break;
        case 'Not authorized':
            status = 401,
            msg = 'Not authorized'
            break;
        case 'Not Found':
            status = 404,
            msg = 'Not Found'
            break;
        case 'Invalid Input':
            status = 401,
            msg = 'Wrong email/password'
            break;
        default:
            status = 500,
            msg = 'Server is busy'
            break;
    }
    

    res.status(status).json({msg})
}


module.exports = errorHandler