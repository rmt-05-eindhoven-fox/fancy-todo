module.exports = function (err, req, res, next) {
  let status = ''
  let error = ''
  console.log(err)
  if (err.name == 'ValidationErrorItem' || err.name == 'SequelizeValidationError') {
    err.errors.forEach((el, i) => {
      if (el.message) {
        error += el.message
      }
      if (i != err.errors.length - 1) {
        error += ', '
      }
    })
    status = err.status
  } else if (err.name == 'JsonWebTokenError') {
    status = 401
    error = 'Authentication Failed'
  } else {
    status = err.status || 500
    error = err.message || 'Internal Server Error'
  }
  res.status(status).json({ error })
}