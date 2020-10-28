function errorHanlder (err, req, res, next) { 
    console.log(err, "<<< ini dari error handler");
}
module.exports = errorHanlder



/**
 * handle validasi input user
 * 
 * {
 *  name : "Sque"
 * }
 */

