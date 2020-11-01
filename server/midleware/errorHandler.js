function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    let error = []
    for (let i = 0; i < err.errors.length; i++) {
      error.push(err.errors[i].message)
    }
    res.status(500).json(error)
  }
  if (err.status === 401) {
    res.status(401).json(err.msg)
  } else {
    res.status(500).json(err)
  }
}

module.exports = errorHandler