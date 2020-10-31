const e = require("express");

module.exports = function(err, req, res, next){
    let status = 500
    let msg = err.name || "internal server error"
    if (msg === "SequelizeValidationError"){
        status = 400
        const error = err.errors
        msg = ""
        error.forEach(el => {
            msg += `${el.message}, `
        });
    }
    else if (msg === "SequelizeUniqueConstraintError"){
        status = 400
        const error = err.errors
        msg = "email must be unique"
        
    }
    res.status(status).json({msg})
}