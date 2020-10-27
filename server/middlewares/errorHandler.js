module.exports = function (err, req, res, next) {
  let status, error
  if (err) {
    err.errors.forEach((el, i) => {
      error += el.message
      if (i != err.errors.length - 1) {
        error += ', '
      }
    })
    status = err.status
  } else {
    status = 500
    error = 'Internal Server Error'
  }
  res.status(status).json({ error })
}