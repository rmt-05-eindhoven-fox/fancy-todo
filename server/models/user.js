'use strict';
const {
  Model
} = require('sequelize');

const { encode, compare } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany( models.Todo )
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          msg : `Not a valid email`
        },
        notNull : {
          msg : `Email property is missing`
        },
        notEmpty : {
          msg : `Email can't be empty`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Password can't be empty`
        },
        notNull : {
          msg : `Password property is missing`
        },
        len :{
          args : [3,12],
          msg : `Password is too short`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate : (user) => {
        user.password = encode(user.password)
      },
      afterCreate : (user) => {
        delete user.password
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};