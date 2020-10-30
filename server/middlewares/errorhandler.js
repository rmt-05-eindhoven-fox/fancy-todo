const response = require("../helpers/response")
function errorHandler(err, req, res, next){
    let status = 500
    let errors = {} || "internal server error"
    let errorList = [];

    switch(err.name){
        case "SequelizeValidationError": 
            err.errors.forEach((elemen) => {
                errorList.push(elemen.message)
            })
            errors = errorList
            status = 400
            break;
        default:
            errors = err.message
            status = err.code || 500
            break;
    }

    res.status(status).json(response.onFailed(errors))
}   

module.exports = errorHandler