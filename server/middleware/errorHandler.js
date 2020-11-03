const errorHandler = (err, req, res, next) => {
  const name = err.name || '';
  let status, error;
  
  switch (name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      error = err.errors.map(el => el.message).join(',');
      break;
    case 'InvalidUserPassword':
      status = 400;
      error = 'Invalid Email or Password';
      break;
    case 'AuthenticationFailed':
      status = 401;
      error = 'Authentication Failed';
      break;
    case 'NotAuthorized':
      status = 403;
      error = 'Not Authorized';
      break;
    case 'NotFound':
      status = 404;
      error = 'Error Not Found';
      break;
    case 'Error':
      if (err.message === 'Please try different email') {
        status = 400;
        error = err.message;
        break;
      }
    default:
      status = 500;
      error = 'Internal server error';
  }

  res.status(status).json({
    error
  });

}

module.exports = errorHandler;