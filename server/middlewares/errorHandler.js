module.exports = function (err, req, res, next) {
  console.log('***masuk error handler***')
  console.log(err)
  let status = 500
  let msg = err.name || 'Internal server error!'
  if (err.name === 'SequelizeValidationError') {
    status = 400
    msg = err.errors.map( el => {
      el.message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = err.errors.map( el => {
      el.message
    })
  }
  res.status(status).json({ msg })
}