'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Email already registered!'
      },
      validate:{
        notEmpty: {
          args: true,
          msg: 'Email is Required!!!'
        },
        isEmail:{
          args: true,
          msg: 'Format must be email!!!'
        }
      }
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       notEmpty:{
         args: true,
         msg: 'Password is required!!!'
       }
     }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};