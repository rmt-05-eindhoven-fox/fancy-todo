function errHandler(err, req, res, next){
    let status = 500
    let errors = [] || "internal server error"

    switch(err.name){
        case "SequelizeValidationError": 
            err.errors.forEach((elemen) => {
                errors.push(elemen.message)
            })
            status = 400
            break;
        default:
            errors.push(err.msg)
            status = err.code || 500
            break;
    }

    res.status(status).json({errors})
}   

module.exports = errHandler