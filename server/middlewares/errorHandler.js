async function errorHandler (err, req, res, next) {
    let status;
    let message;
    console.log(err.message)
    if (err.status) {
        res.status(err.status).json({message: err.message})
      }
    
    switch (err.name) {
        case "SequelizeValidationError":
            status = 400
            message = err.errors[0].message
            break;
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;
        case "SequelizeDatabaseError":
            status = 400
            message = err.message
            break;
        default:
            status = 500
            message = err.name || `Internal Server Error`
    }
    res.status(status).json({message})
}

module.exports = errorHandler