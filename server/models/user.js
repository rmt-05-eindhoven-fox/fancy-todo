'use strict';
const {
  Model
} = require('sequelize');

const { hashPaasword, comparePassword} = require('../helpers/bcrypt')

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
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true, 
          msg: 'please input a valid email address'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is required'
        }
      }

    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPaasword(user.password)
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;
};