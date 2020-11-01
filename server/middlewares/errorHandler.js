module.exports = function (err, req, res, next) {
  console.log('***masuk error handler***')
  // console.log(err, "+++++++++=========== err")
  // console.log(err.name, "+++++++++=========== err")
  let status = err.status || 500
  let msg = err.name || err.msg || 'Internal server error!'
  // console.log('status:', status, 'msg:', msg)
  if (err.name === 'SequelizeValidationError') {
    // console.log('err message:', err.errors[0].message)
    status = 400
    msg = err.errors.map( el => {
      return el.message
    }).join('<br/>')
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = err.errors.map( el => {
      return el.message
    })
  }
  // console.log(msg, status)
  res.status(status).json(msg)
}