'use strict'

module.exports = function (err, req, res, next){
  console.log(err);
  let status = 500;
  let msg = err.message || 'Internal Server Error';
  if(err.type === 'Validation error'){
    status = 400;
    msg = err.message;
  }
  else if(err.msg){
    status = err.status;
    msg = err.msg;
  }
  res.status(status).json(msg);
}