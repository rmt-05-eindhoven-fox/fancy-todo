function errorHandler(err, req, res, next) {
    let name = err.name || '';
    let status, error;

    switch (name) {
        case 'SequelizeValidationError':
            status = 400;
            error = err.errors.map(el => el.message).join(' ');
            break;
        case 'InvalidEmail/Password':
            status = 400;
            error = 'Email/Password is wrong!';
            break;
        case 'AuthenticationFailed':
            status = 401;
            error = 'Authentication Failed!';
            break;
        case 'NotAuthorized!':
            status = 403;
            error = 'Not Authorized!';
            break;
        case 'NotFound':
            status = 404;
            error = 'Error not found!';
            break;
        default:
            status = 500;
            error = 'Internal server error';
            break;
    }
    res.status(status).json({error});
}
module.exports = errorHandler