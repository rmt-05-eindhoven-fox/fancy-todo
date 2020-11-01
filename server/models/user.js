'use strict';
const {
  Model
} = require('sequelize');


const { hashPassword } = require('../helper/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Must be email format!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    }
  }, 
   {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (int, opt) {
        int.password = hashPassword(int.password)
      }
    }
  });
  return User;
};