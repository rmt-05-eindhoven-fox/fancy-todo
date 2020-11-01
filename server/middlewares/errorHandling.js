module.exports = function (err, req, res, next) {
  // return res.status(500).json({ err})
  // console.log(err);
  let status = err.status || 500
  let msg = err.msg || 'internal server error'
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      status = 400
      msg = err.errors.map(el => {
        return el.message
      }).join(', ')   
      break;
    case "SequelizeValidationError":
      status = 400
      msg = err.errors.map(el => {
        return el.message
      }).join(', ')    
      break;
  }
  
  res.status(status).json({ errors: msg })  
}