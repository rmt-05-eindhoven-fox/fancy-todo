const createError = require('http-errors');
const { User } = require('../models');
const { verivyToken } = require("../helper/jwt");

function auth(req, res, next) {
  const { accesstoken } = req.headers;
  try {
    if (!accesstoken) {
      next(createError(401, 'Authentication failed!')); 
    } else {
      const decoded = verivyToken(accesstoken);
      User.findOne({
        where: { id: decoded.id }
      })
        .then((user) => {
          if (!user) {
            next(createError(401, 'Authentication failed!'));
          } else {
            req.logedInUser = decoded;
            next();
          }
        }).catch((err) => {
          next(createError(500, err.message));
        });
    }
  } catch (err) {
    next(createError(500, err.message));
  }
}

module.exports = auth;