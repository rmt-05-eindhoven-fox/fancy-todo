'use strict'

const { Todo } = require('../models');

async function authorization (req, res, next){
  const { id } = req.params;
  try {
    const data = await Todo.findByPk(id);
    if(!data){
      throw { msg: 'Todos not found', status: 404 }
    }
    else if(data.UserId === req.loggedInUser.id){
      next();
    }
    else {
      throw { msg: 'Not Authorized', status: 401 }
    }
  } catch (err) {
    next(err);
    // const status = err.status || 500;
    // const msg = err.msg || 'Internal Server Error';
    // res.status(status).json({ error: msg })
  }
}

module.exports = authorization;