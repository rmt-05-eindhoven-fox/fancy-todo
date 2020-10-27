'use strict';
const {
  Model
} = require('sequelize');

const { encode, compare } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          msg : `Not a valid email`
        },
        notEmpty : {
          msg : `Email can't be empty`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Password can't be empty`
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