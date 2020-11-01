async function errorHandler (err, req, res, next){
    let status = err.status || 500
    let msg = err.msg || "Interal Server Error"

    if (err.name === "SequelizeValidationError"){
        status = 400
        msg = ''
        let errError = []
        for(let i = 0; i < err.errors.length; i++){
            errError.push(err.errors[i].message)
        }
        msg += errError.join(', ')
    } else if (err.name === "SequelizeUniqueConstraintError") {
        status = 400
        msg += err.errors[0].message
    }

    res.status(status).json({msg})
}

module.exports = errorHandler
