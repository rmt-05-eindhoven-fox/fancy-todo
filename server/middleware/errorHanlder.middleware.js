function errorHanlder(err, req, res, next) {

    console.log(err, "<<< ini dari error handler");

    let status = 500
    let message = err.name
    let error; 
    switch (message) {
        case "SequelizeValidationError":
            error = err.errors.map(error => {
                return error.message
            }).join(", ")
            status = 400
            break;
        case "wrong email/password":
            error = "wrong email/password",
                status = 401
            break;
        case "Authentication failed":
            error = "Authentication failed"
            status = 400
            break;
        case "Notauthorized":
            error = "Notauthorized"
            status = 400
            break;
        case "NotFound":
            error = "NotFound"
            status = 404
            break;
        default:
            name = "internal server error"
            status = 500
            break;

    }
    res.status(status).json({
        error
    })
}
module.exports = errorHanlder

