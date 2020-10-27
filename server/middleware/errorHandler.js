function errorHandler(err, req, res, next) {
  let status = err.status || 500
  let msg = err.message || 'Internal Server Error'

  // if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
  //   status = 400
  //   msg = err.errors[0].message
  // }

  switch(err.name) {
    case 'SequelizeValidationError':
      status = 400
      msg = err.errors.map(el => el.message).join(' | ')
      break;
    case 'SequelizeUniqueConstraintError':
      status = 400
      msg = err.errors[0].message
      break;
    default:
      console.log(err)
  }
  res.status(status).json({msg})
}

module.exports = errorHandler