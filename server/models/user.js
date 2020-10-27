'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash');
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
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Email must be in example@mail.com format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password is required`
        },
        len: {
          args: [5],
          msg: `Password must be more than 5 character`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};