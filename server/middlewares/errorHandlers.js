module.exports = function (err, req, res, next){

    // let status = 500
    let message = err.message || 'internal server error'

    if(err.name === 'SequelizeValidationError'){
        status = 400
        message = err.errors[0].message
    }
    res.status(err.status).json({
        message
    })
}

