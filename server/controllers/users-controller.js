'use strict'

const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models/')

class UsersController{
  static async postRegister(req, res, next){
    const objParam = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const data = await User.create(objParam);
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    } catch (err) {
      next(err);
      // res.status(400).json(err);
    }
  }

  static async postLogin(req, res, next){
    const objParam = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const data = await User.findOne({
        where: { email: objParam.email }
      });
      if(!data){
        throw { msg: 'Wrong email / password', status:401 };
      }
      else if(!comparePassword(objParam.password, data.password)){
        throw { msg: 'Wrong email / password', status:401 };
      }
      else{
        const token = signToken({
          id: data.id,
          email: data.email
        });
        res.status(200).json(token);
      }
    } catch (err) {
      next(err);
      // console.log(err)
      // const status = err.status || 400;
      // const error = err.msg || 'Bad Request';
      // res.status(status).json(error);
    }
  }
}

module.exports = UsersController