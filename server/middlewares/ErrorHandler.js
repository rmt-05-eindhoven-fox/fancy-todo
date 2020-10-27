module.exports = function(err, req, res, next){
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'
    if (err.name === 'SequelizeValidationError') {
        status = 500;
        message = err.errors[0].message;
    }
    console.log(err.name)
    console.log(status);
    console.log(message);
    res.status(status).json({error: message});
}