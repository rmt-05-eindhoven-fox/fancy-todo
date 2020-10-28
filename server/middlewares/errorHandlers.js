function errorHandle(err, req, res, next){

    let status = 500
    let messege = err.massage 

    if(err.name === 'SequelizeValidationError'){
        status = 400
        messege = err.errors[0].massage
    }
    res.status(status).json({
        messege
    })

}

module.exports = errorHandle