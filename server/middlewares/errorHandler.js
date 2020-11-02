module.exports = function(err, req, res, next){
  let status = 500;
  let msg = err.name || 'Internal Server Error';

  switch(msg){
    case 'SequelizeValidationError':
      status = 400;
      msg = err.errors[0].message;
      break;
  }

  res.status(status).json({msg});
}