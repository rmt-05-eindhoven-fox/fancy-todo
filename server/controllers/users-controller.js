'use strict'

const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models/');
const { OAuth2Client } = require('google-auth-library');

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

  static googleLogin(req, res, next){
    let { google_access_token } = req.body;
    let email;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID,  
    })
    .then(data => {
      let payload = data.getPayload();
      email = payload.email;
      // console.log(payload, 'data payload dave');
      return User.findOne({
        where: { email }
      })
    })
    .then(user=>{
      console.log(user)
      if(user){
        return user;
      }
      else{
        let userObj = {
          email,
          password: 'randomkuy'
        }
        return User.create(userObj)
      }
    })
    .then(dataUser=> {
      let token = signToken({
        id: dataUser.id,
        email: dataUser.email
      })
      res.status(200).json(token);
    })
    .catch(err => {
      next(err);
    })

  }
}

module.exports = UsersController