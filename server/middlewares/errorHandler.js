function errorHandler (err, req, res, next) {


  let errors = []
  let statusCode = 500

  switch(err.name) {
    case 'Authorization Failed':
      errors.push('No access allowed!')
      statusCode = 403
      break
      case 'AuthenticationFailed':
        case 'JsonWebTokenError':
          errors.push('Authentication has failed!')
          statusCode = 401
          break
          case 'SequelizeUniqueConstraintError':
            case 'SequelizeValidationError':
              err.errors.forEach(error => errors.push(error.message))
              statusCode = 400
              break
              default:
                errors.push('Internal server error')
                statusCode = 500
  }

  res.status(statusCode).json({
    errors:errors
  })
}

module.exports = errorHandler